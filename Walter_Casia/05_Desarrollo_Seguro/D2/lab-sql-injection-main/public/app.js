/**
 * @file app.js
 * @description Logica frontend interactiva para el Laboratorio Academico de Inyeccion SQL.
 * Maneja las peticiones AJAX, la navegacion por pestanas, el control de mitigaciones,
 * y muestra dinamicamente las consultas y errores SQL.
 * Incorpora un sistema de gamificacion, listas de objetivos CTF y un editor de codigo interactivo.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Elementos del DOM ----
    const secureModeToggle = document.getElementById('secure-toggle');
    const securityControlContainer = document.querySelector('.security-control');
    const securityStatusLabel = document.getElementById('security-status-text');
    const sqlQueryDisplayArea = document.getElementById('sql-query-display');
    const copyQueryClipboardButton = document.getElementById('copy-query-btn');
    
    const databaseStatusDotIndicator = document.getElementById('db-status-dot');
    const databaseStatusTextLabel = document.getElementById('db-status-text');
    
    const navigationSidebarLinks = document.querySelectorAll('.sidebar li');
    const tabPanelsContainer = document.querySelectorAll('.tab-content');

    const globalProgressBarFill = document.getElementById('global-progress-bar');
    const globalProgressPercentageLabel = document.getElementById('global-progress-percentage');
    const congratulationsCardPanel = document.getElementById('congratulations-card');

    // ---- Sistema de Gamificacion y Estado del Progreso ----
    const localStorageProgressKey = 'sqli_lab_progress_state_2026_gamified';
    
    // Arreglo con la secuencia de desbloqueo ordenado del laboratorio
    const tabOrderSequence = ['login', 'union', 'error', 'boolean', 'time', 'update'];

    // Inicializacion de un estado detallado con sub-pasos CTF por unidad
    let progressState = JSON.parse(localStorage.getItem(localStorageProgressKey)) || {
        login: { introConfirmed: false, exploited: false, codeCorrected: false, mitigated: false },
        union: { introConfirmed: false, exploited: false, codeCorrected: false, mitigated: false },
        error: { introConfirmed: false, exploited: false, codeCorrected: false, mitigated: false },
        boolean: { introConfirmed: false, exploited: false, codeCorrected: false, mitigated: false },
        time: { introConfirmed: false, exploited: false, codeCorrected: false, mitigated: false },
        update: { introConfirmed: false, exploited: false, codeCorrected: false, mitigated: false }
    };

    // Asegurar compatibilidad e inicializacion defensiva de campos
    tabOrderSequence.forEach(tabName => {
        if (!progressState[tabName]) {
            progressState[tabName] = { introConfirmed: false, exploited: false, codeCorrected: false, mitigated: false };
        }
        if (progressState[tabName].introConfirmed === undefined) {
            progressState[tabName].introConfirmed = false;
        }
    });

    /**
     * @function renderProgressUI
     * @description Calcula los porcentajes de completado individuales y globales,
     * actualiza los checklists de objetivos en pantalla, bloquea/desbloquea
     * enlaces laterales y revela el banner de felicitacion final.
     */
    function renderProgressUI() {
        let totalCompletedObjectives = 0;
        const totalPossibleObjectives = tabOrderSequence.length * 3; // 3 objetivos por pestaña (Explotar, Codigo, Mitigar)

        tabOrderSequence.forEach((tabName, index) => {
            const objectiveState = progressState[tabName];
            let tabScorePercentage = 0;

            // Calcular score individual por hito
            if (objectiveState.exploited) tabScorePercentage += 33;
            if (objectiveState.codeCorrected) tabScorePercentage += 33;
            if (objectiveState.mitigated) tabScorePercentage += 34;

            if (objectiveState.exploited) totalCompletedObjectives++;
            if (objectiveState.codeCorrected) totalCompletedObjectives++;
            if (objectiveState.mitigated) totalCompletedObjectives++;

            // Actualizar etiquetas del score individual
            const scoreLabelElement = document.getElementById(`score-${tabName}`);
            if (scoreLabelElement) {
                scoreLabelElement.textContent = `${tabScorePercentage}%`;
            }

            // Actualizar checklist visual en el HTML
            updateChecklistUI(tabName, 'exploit', objectiveState.exploited);
            updateChecklistUI(tabName, 'mitigate-code', objectiveState.codeCorrected);
            updateChecklistUI(tabName, 'mitigate-test', objectiveState.mitigated);

            // Sincronizar clase visual de introduccion confirmada para ocultar/mostrar teoria
            const tabContentPanel = document.getElementById(`tab-${tabName}`);
            if (tabContentPanel) {
                if (objectiveState.introConfirmed) {
                    tabContentPanel.classList.add('intro-confirmed');
                } else {
                    tabContentPanel.classList.remove('intro-confirmed');
                }
            }

            // Gestionar bloqueos en la barra lateral
            const nextTabLinkElement = document.getElementById(`nav-${tabName}`);
            if (nextTabLinkElement && index > 0) {
                const previousTabName = tabOrderSequence[index - 1];
                const previousTabObjectiveState = progressState[previousTabName];
                const isPreviousTabFinished = previousTabObjectiveState.exploited && previousTabObjectiveState.codeCorrected && previousTabObjectiveState.mitigated;

                if (isPreviousTabFinished) {
                    nextTabLinkElement.classList.remove('locked');
                } else {
                    nextTabLinkElement.classList.add('locked');
                }
            }
        });

        // Calcular porcentaje global
        const globalProgressPercentage = Math.round((totalCompletedObjectives / totalPossibleObjectives) * 100);
        globalProgressBarFill.style.width = `${globalProgressPercentage}%`;
        globalProgressPercentageLabel.textContent = `${globalProgressPercentage}%`;

        // Mostrar felicitaciones si se completo el 100%
        if (globalProgressPercentage === 100) {
            congratulationsCardPanel.style.display = 'block';
        } else {
            congratulationsCardPanel.style.display = 'none';
        }

        // Guardar progreso en almacenamiento local
        localStorage.setItem(localStorageProgressKey, JSON.stringify(progressState));
    }

    /**
     * @function updateChecklistUI
     * @description Modifica el estilo visual de los elementos de la lista de objetivos.
     */
    function updateChecklistUI(tabName, stepIdSuffix, isCompleted) {
        const stepItemElement = document.getElementById(`step-${tabName}-${stepIdSuffix}`);
        if (stepItemElement) {
            if (isCompleted) {
                stepItemElement.classList.add('completed');
                const checkboxElement = stepItemElement.querySelector('.step-checkbox');
                if (checkboxElement) {
                    checkboxElement.textContent = '✓';
                }
            } else {
                stepItemElement.classList.remove('completed');
                const checkboxElement = stepItemElement.querySelector('.step-checkbox');
                if (checkboxElement) {
                    checkboxElement.textContent = '';
                }
            }
        }
    }

    /**
     * @function registerObjectiveProgress
     * @description Registra un hito completado en el estado y actualiza la UI.
     */
    function registerObjectiveProgress(tabName, objectiveType) {
        if (progressState[tabName] && progressState[tabName][objectiveType] === false) {
            // Regla: Para registrar la mitigacion real (Paso 3), el estudiante debe haber corregido el codigo primero (Paso 2)
            if (objectiveType === 'mitigated' && !progressState[tabName].codeCorrected) {
                return;
            }
            progressState[tabName][objectiveType] = true;
            renderProgressUI();
        }
    }

    // Inicializar interfaz con el progreso guardado
    renderProgressUI();

    /**
     * @function checkDatabaseHealth
     * @description Realiza una peticion para comprobar el estado de conexion a la base de datos MySQL.
     */
    async function checkDatabaseHealth() {
        try {
            const healthApiResponse = await fetch('/api/health');
            const healthStatusData = await healthApiResponse.json();
            
            if (healthStatusData.status === 'connected') {
                databaseStatusDotIndicator.className = 'status-indicator connected';
                databaseStatusTextLabel.textContent = 'BD Conectada (aprendiendo_sql)';
            } else {
                databaseStatusDotIndicator.className = 'status-indicator error';
                databaseStatusTextLabel.textContent = 'Error: ' + healthStatusData.message;
            }
        } catch (connectionFetchError) {
            databaseStatusDotIndicator.className = 'status-indicator error';
            databaseStatusTextLabel.textContent = 'Error: No se pudo conectar con el servidor API';
        }
    }
    checkDatabaseHealth();

    /**
     * Manejador de navegacion por pestanas
     */
    navigationSidebarLinks.forEach(sidebarLink => {
        sidebarLink.addEventListener('click', () => {
            if (sidebarLink.classList.contains('locked')) {
                return;
            }

            navigationSidebarLinks.forEach(link => link.classList.remove('active'));
            tabPanelsContainer.forEach(panel => panel.classList.remove('active'));

            sidebarLink.classList.add('active');
            const targetTabPanelId = `tab-${sidebarLink.getAttribute('data-tab')}`;
            document.getElementById(targetTabPanelId).classList.add('active');

            // Sincronizar el estado seguro/inseguro en el backend basándose en si corrigieron el código de esa pestaña
            const activeTabName = sidebarLink.getAttribute('data-tab');
            if (progressState[activeTabName]) {
                secureModeToggle.checked = progressState[activeTabName].codeCorrected;
                updateSecurityModeUI();
            }
        });
    });

    /**
     * Manejador de confirmacion para comenzar retos practicos (Pantallas Educativas)
     */
    document.querySelectorAll('.start-challenge-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetTabName = button.getAttribute('data-target');
            if (progressState[targetTabName]) {
                progressState[targetTabName].introConfirmed = true;
                renderProgressUI();
            }
        });
    });

    /**
     * Manejador para volver a mostrar la introduccion teorica desde el reto practico
     */
    document.querySelectorAll('.show-intro-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetTabName = button.getAttribute('data-target');
            if (progressState[targetTabName]) {
                progressState[targetTabName].introConfirmed = false;
                renderProgressUI();
            }
        });
    });

    /**
     * @function updateSecurityModeUI
     * @description Modifica las clases y etiquetas visuales de la interfaz.
     */
    function updateSecurityModeUI() {
        const isSecureModeActive = secureModeToggle.checked;
        if (isSecureModeActive) {
            securityControlContainer.className = 'security-control secure-state';
            securityStatusLabel.textContent = 'Estado: SEGURO (Consultas Preparadas)';
        } else {
            securityControlContainer.className = 'security-control vulnerable-state';
            securityStatusLabel.textContent = 'Estado: INSEGURO (Vulnerable)';
        }
    }
    
    secureModeToggle.addEventListener('change', updateSecurityModeUI);
    updateSecurityModeUI();

    /**
     * Copiar consulta al portapapeles
     */
    copyQueryClipboardButton.addEventListener('click', () => {
        const currentSqlQueryText = sqlQueryDisplayArea.innerText;
        if (currentSqlQueryText && currentSqlQueryText !== 'Esperando accion...') {
            navigator.clipboard.writeText(currentSqlQueryText);
            const originalButtonText = copyQueryClipboardButton.textContent;
            copyQueryClipboardButton.textContent = 'Copiado';
            setTimeout(() => {
                copyQueryClipboardButton.textContent = originalButtonText;
            }, 1500);
        }
    });

    function updateSqlQueryDisplay(sqlQueryString) {
        if (sqlQueryString) {
            sqlQueryDisplayArea.textContent = sqlQueryString;
        }
    }

    // =========================================================================
    // MOTOR DE VALIDACION DEL EDITOR DE CODIGO INTERACTIVO
    // =========================================================================
    
    /**
     * @function validateCodeChallenge
     * @description Parsea el codigo ingresado en la pestaña especificada, verifica si aplica
     * los principios de las consultas preparadas y actualiza el estado de la unidad.
     * @param {string} tabName - Identificador de la pestaña/unidad.
     */
    function validateCodeChallenge(tabName) {
        const editorTextArea = document.getElementById(`code-editor-${tabName}`);
        const validationBox = document.getElementById(`validation-box-${tabName}`);
        
        if (!editorTextArea || !validationBox) return;

        const codeContentText = editorTextArea.value;
        let isCodeCorrect = false;
        let errorMessage = '';

        // Criterios estrictos de validacion semantica de codigo academico por pestaña
        switch(tabName) {
            case 'login':
                const hasPlaceholders = codeContentText.includes('?') && codeContentText.includes('WHERE');
                const hasCorrectParameters = codeContentText.includes('[username, password]') || codeContentText.includes('[password, username]');
                if (hasPlaceholders && hasCorrectParameters) {
                    isCodeCorrect = true;
                } else {
                    errorMessage = 'Asegurate de usar los comodines "?" en tu query y de pasar las variables "[username, password]" en la llamada a query.';
                }
                break;
                
            case 'union':
                const hasUnionPlaceholder = codeContentText.includes('?') && codeContentText.includes('LIKE');
                const hasUnionParams = codeContentText.includes('search') || codeContentText.includes('`%${search}%`');
                if (hasUnionPlaceholder && hasUnionParams) {
                    isCodeCorrect = true;
                } else {
                    errorMessage = 'Recuerda usar un comodin "?" en el LIKE y de inyectar los caracteres comodines "%" en el parametro de busqueda.';
                }
                break;

            case 'error':
                const hasIntegerCasting = codeContentText.includes('parseInt') || codeContentText.includes('?');
                if (hasIntegerCasting) {
                    isCodeCorrect = true;
                } else {
                    errorMessage = 'Aplica una conversion a entero mediante "parseInt(id, 10)" o usa placeholders "?" para sanitizar la entrada de ID.';
                }
                break;

            case 'boolean':
                const hasBooleanPlaceholder = codeContentText.includes('?') && codeContentText.includes('WHERE id');
                const hasBooleanParam = codeContentText.includes('[id]') || codeContentText.includes('parseInt');
                if (hasBooleanPlaceholder && hasBooleanParam) {
                    isCodeCorrect = true;
                } else {
                    errorMessage = 'Asegurate de parametrizar el campo "id" en tu consulta SQL y pasarlo en el arreglo de argumentos.';
                }
                break;

            case 'time':
                const hasTimePlaceholder = codeContentText.includes('?') && codeContentText.includes('WHERE id');
                const hasTimeParam = codeContentText.includes('[id]') || codeContentText.includes('parseInt');
                if (hasTimePlaceholder && hasTimeParam) {
                    isCodeCorrect = true;
                } else {
                    errorMessage = 'Recuerda que la consulta preparada evita la evaluacion de funciones SLEEP al parametrizar la entrada del ID.';
                }
                break;

            case 'update':
                const hasTwoUpdatePlaceholders = (codeContentText.match(/\?/g) || []).length >= 2;
                const hasUpdateParams = codeContentText.includes('[bio, userId]') || codeContentText.includes('[bio, id]');
                if (hasTwoUpdatePlaceholders && hasUpdateParams) {
                    isCodeCorrect = true;
                } else {
                    errorMessage = 'La sentencia UPDATE debe tener dos comodines "?" (para la bio y para el ID de usuario) y pasarlos en el orden correspondiente: [bio, userId].';
                }
                break;
        }

        // Renderizar retroalimentacion de la validacion en la interfaz
        if (isCodeCorrect) {
            validationBox.className = 'code-editor-validation-box validation-success';
            validationBox.textContent = 'Codigo validado correctamente. La mitigacion de inyeccion ha sido cargada en el servidor. Ahora realiza el Paso 3 para validar la defensa.';
            validationBox.style.display = 'block';

            // Marcar Hito 2 (Codigo Corregido) como completado
            registerObjectiveProgress(tabName, 'codeCorrected');

            // Habilitar automaticamente el modo seguro en el switch para la prueba del Paso 3
            secureModeToggle.checked = true;
            updateSecurityModeUI();
        } else {
            validationBox.className = 'code-editor-validation-box validation-error';
            validationBox.textContent = `Error de Mitigacion: ${errorMessage}`;
            validationBox.style.display = 'block';
        }
    }

    // Registrar escuchadores de clic para los botones de validacion
    tabOrderSequence.forEach(tabName => {
        const validateBtn = document.getElementById(`validate-btn-${tabName}`);
        if (validateBtn) {
            validateBtn.addEventListener('click', () => validateCodeChallenge(tabName));
        }
    });


    // ==========================================
    // FORMULARIO 1: LOGIN BYPASS (AUTENTICACION)
    // ==========================================
    const loginUserForm = document.getElementById('login-form');
    const loginActionResponseBox = document.getElementById('login-response');
    
    loginUserForm.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();
        loginActionResponseBox.innerHTML = 'Procesando peticion de ingreso...';
        
        const usernameFieldValue = document.getElementById('login-username').value;
        const passwordFieldValue = document.getElementById('login-password').value;
        const isSecureModeEnabled = secureModeToggle.checked;
        
        try {
            const apiResponse = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: usernameFieldValue, 
                    password: passwordFieldValue, 
                    secure: isSecureModeEnabled 
                })
            });
            const responseData = await apiResponse.json();
            
            updateSqlQueryDisplay(responseData.query || responseData.error);
            
            if (apiResponse.ok) {
                if (responseData.success) {
                    loginActionResponseBox.innerHTML = `
                        <div class="success-badge">Login Exitoso</div>
                        <div style="margin-top: 10px;">
                            <strong>Bienvenido, ${responseData.user.username}!</strong><br>
                            <strong>Rol asignado:</strong> ${responseData.user.role}<br>
                            <strong>Biografia:</strong> ${responseData.user.bio}
                        </div>
                    `;

                    // Registrar exito en explotacion si cumple el payload academico clasico
                    if (!isSecureModeEnabled && (usernameFieldValue.includes("'") || usernameFieldValue.includes("#"))) {
                        registerObjectiveProgress('login', 'exploited');
                    }
                } else {
                    loginActionResponseBox.innerHTML = `
                        <div class="fail-badge">Credenciales Incorrectas</div>
                        <div style="margin-top: 10px; color: var(--text-muted);">
                            No se encontro ningun registro de usuario con las credenciales provistas.
                        </div>
                    `;

                    // Registrar exito en mitigacion si el ataque fue neutralizado con el codigo seguro activo
                    if (isSecureModeEnabled && progressState.login.codeCorrected && (usernameFieldValue.includes("'") || usernameFieldValue.includes("#"))) {
                        registerObjectiveProgress('login', 'mitigated');
                    }
                }
            } else {
                loginActionResponseBox.innerHTML = `
                    <div class="sql-error-message">
                        <strong>Error del Servidor / BD:</strong><br>
                        <code>${responseData.error || 'Error interno en el backend'}</code>
                    </div>
                `;
            }
        } catch (networkCommunicationError) {
            loginActionResponseBox.innerHTML = `<div class="sql-error-message">Error de Red: ${networkCommunicationError.message}</div>`;
        }
    });

    // ==========================================
    // FORMULARIO 2: UNION-BASED (PRODUCTOS)
    // ==========================================
    const unionSearchForm = document.getElementById('union-form');
    const unionSearchResponseBox = document.getElementById('union-response');

    unionSearchForm.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();
        unionSearchResponseBox.innerHTML = 'Realizando busqueda de productos...';
        
        const searchQueryValue = document.getElementById('union-search').value;
        const isSecureModeEnabled = secureModeToggle.checked;
        
        try {
            const apiResponse = await fetch(`/api/products/search?search=${encodeURIComponent(searchQueryValue)}&secure=${isSecureModeEnabled}`);
            const responseData = await apiResponse.json();
            
            updateSqlQueryDisplay(responseData.query || responseData.error);
            
            if (apiResponse.ok) {
                if (!responseData.results || responseData.results.length === 0) {
                    unionSearchResponseBox.innerHTML = 'La busqueda no arrojo ningun producto.';
                    
                    if (isSecureModeEnabled && progressState.union.codeCorrected && searchQueryValue.includes("UNION")) {
                        registerObjectiveProgress('union', 'mitigated');
                    }
                    return;
                }
                
                let tableTemplateHtml = `<table class="sql-result-table"><thead><tr>`;
                const databaseObjectFields = Object.keys(responseData.results[0]);
                
                databaseObjectFields.forEach(tableFieldHeader => {
                    tableTemplateHtml += `<th>${tableFieldHeader}</th>`;
                });
                tableTemplateHtml += `</tr></thead><tbody>`;
                
                responseData.results.forEach(dataRow => {
                    tableTemplateHtml += `<tr>`;
                    databaseObjectFields.forEach(fieldKey => {
                        tableTemplateHtml += `<td>${dataRow[fieldKey] !== null ? dataRow[fieldKey] : '<i>NULL</i>'}</td>`;
                    });
                    tableTemplateHtml += `</tr>`;
                });
                tableTemplateHtml += `</tbody></table>`;
                
                unionSearchResponseBox.innerHTML = tableTemplateHtml;

                if (!isSecureModeEnabled && searchQueryValue.includes('secret_note') && searchQueryValue.includes("UNION")) {
                    registerObjectiveProgress('union', 'exploited');
                }
            } else {
                unionSearchResponseBox.innerHTML = `
                    <div class="sql-error-message">
                        <strong>Error en Base de Datos:</strong><br>
                        <code>${responseData.error}</code>
                    </div>
                `;
            }
        } catch (networkCommunicationError) {
            unionSearchResponseBox.innerHTML = `<div class="sql-error-message">Error de Red: ${networkCommunicationError.message}</div>`;
        }
    });

    // ==========================================
    // FORMULARIO 3: ERROR-BASED (PERFIL DE USUARIO)
    // ==========================================
    const errorSqliForm = document.getElementById('error-form');
    const errorSqliResponseBox = document.getElementById('error-response');

    errorSqliForm.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();
        errorSqliResponseBox.innerHTML = 'Consultando perfil de usuario...';
        
        const userIdFieldValue = document.getElementById('error-user-id').value;
        const isSecureModeEnabled = secureModeToggle.checked;
        
        try {
            const apiResponse = await fetch(`/api/users/profile?id=${encodeURIComponent(userIdFieldValue)}&secure=${isSecureModeEnabled}`);
            const responseData = await apiResponse.json();
            
            updateSqlQueryDisplay(responseData.query || responseData.error);
            
            if (apiResponse.ok) {
                if (responseData.user) {
                    errorSqliResponseBox.innerHTML = `
                        <div class="success-badge">Usuario Encontrado</div>
                        <div style="margin-top: 10px;">
                            <strong>ID de Usuario:</strong> ${responseData.user.id}<br>
                            <strong>Username:</strong> ${responseData.user.username}<br>
                            <strong>Rol del Sistema:</strong> ${responseData.user.role}<br>
                            <strong>Biografia:</strong> ${responseData.user.bio}
                        </div>
                    `;

                    if (isSecureModeEnabled && progressState.error.codeCorrected && (userIdFieldValue.includes("'") || userIdFieldValue.includes("ExtractValue") || userIdFieldValue.includes("CONVERT"))) {
                        registerObjectiveProgress('error', 'mitigated');
                    }
                } else {
                    errorSqliResponseBox.innerHTML = '<div class="fail-badge">Usuario No Encontrado</div>';
                }
            } else {
                errorSqliResponseBox.innerHTML = `
                    <div class="sql-error-message">
                        <strong>Mensaje de Error SQL Nativo:</strong><br>
                        <code>${responseData.error}</code>
                    </div>
                `;

                if (!isSecureModeEnabled && (userIdFieldValue.includes("'") || userIdFieldValue.includes("ExtractValue") || userIdFieldValue.includes("CONVERT"))) {
                    registerObjectiveProgress('error', 'exploited');
                }
            }
        } catch (networkCommunicationError) {
            errorSqliResponseBox.innerHTML = `<div class="sql-error-message">Error de Red: ${networkCommunicationError.message}</div>`;
        }
    });

    // ==========================================
    // FORMULARIO 4: CIEGA BOOLEANA (DETALLES)
    // ==========================================
    const booleanBlindForm = document.getElementById('boolean-form');
    const booleanBlindResponseBox = document.getElementById('boolean-response');

    booleanBlindForm.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();
        booleanBlindResponseBox.innerHTML = 'Verificando existencia en la base de datos...';
        
        const productSearchIdValue = document.getElementById('boolean-product-id').value;
        const isSecureModeEnabled = secureModeToggle.checked;
        
        try {
            const apiResponse = await fetch(`/api/products/details?id=${encodeURIComponent(productSearchIdValue)}&secure=${isSecureModeEnabled}`);
            const responseData = await apiResponse.json();
            
            updateSqlQueryDisplay(responseData.query);
            
            if (responseData.exists) {
                booleanBlindResponseBox.innerHTML = `
                    <div class="success-badge">VERDADERO</div>
                    <div style="margin-top: 10px; color: var(--accent-secure);">
                        El registro existe en el catalogo (Consulta SQL retorno filas).
                    </div>
                `;

                if (!isSecureModeEnabled && (productSearchIdValue.includes("AND") || productSearchIdValue.includes("OR")) && productSearchIdValue.includes("1=1")) {
                    registerObjectiveProgress('boolean', 'exploited');
                }
            } else {
                booleanBlindResponseBox.innerHTML = `
                    <div class="fail-badge">FALSO</div>
                    <div style="margin-top: 10px; color: var(--accent-vulnerable);">
                        El registro no existe en el catalogo (Consulta SQL retorno vacia).
                    </div>
                `;
            }

            // Registrar exito en mitigacion si el ataque fue neutralizado con el codigo seguro activo (independiente de si existe o no)
            if (isSecureModeEnabled && progressState.boolean.codeCorrected && (productSearchIdValue.includes("AND") || productSearchIdValue.includes("OR"))) {
                registerObjectiveProgress('boolean', 'mitigated');
            }
        } catch (networkCommunicationError) {
            booleanBlindResponseBox.innerHTML = `<div class="sql-error-message">Error de Red: ${networkCommunicationError.message}</div>`;
        }
    });

    // ==========================================
    // FORMULARIO 5: CIEGA POR TIEMPO (ESTADO)
    // ==========================================
    const timeBasedBlindForm = document.getElementById('time-form');
    const timeBasedBlindResponseBox = document.getElementById('time-response');

    timeBasedBlindForm.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();
        timeBasedBlindResponseBox.innerHTML = 'Despachando solicitud y midiendo retraso en servidor...';
        
        const productSearchIdValue = document.getElementById('time-product-id').value;
        const isSecureModeEnabled = secureModeToggle.checked;
        const executionStartTimestamp = Date.now();
        
        try {
            const apiResponse = await fetch(`/api/server/status?id=${encodeURIComponent(productSearchIdValue)}&secure=${isSecureModeEnabled}`);
            const responseData = await apiResponse.json();
            const elapsedMilliseconds = Date.now() - executionStartTimestamp;
            
            updateSqlQueryDisplay(responseData.query);
            
            timeBasedBlindResponseBox.innerHTML = `
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <span class="success-badge">Solicitud Finalizada</span>
                    <span class="fail-badge" style="background-color: rgba(59, 130, 246, 0.1); color: var(--accent); border-color: var(--accent);">
                        Tiempo de respuesta medido: ${(elapsedMilliseconds / 1000).toFixed(2)} segundos
                    </span>
                </div>
                <div style="margin-top: 12px;">
                    <strong>Respuesta del servidor API:</strong> ${responseData.status}<br>
                    <strong>Tiempo medido en backend:</strong> ${(responseData.timeMs / 1000).toFixed(2)} segundos<br>
                    <span style="font-size: 12px; color: var(--text-muted);">
                        Nota: Si inyectaste una instruccion de retardo como <code>SLEEP(3)</code> y el tiempo total de respuesta medido coincide con ese valor, la vulnerabilidad ha sido confirmada.
                    </span>
                </div>
            `;

            if (!isSecureModeEnabled && elapsedMilliseconds >= 2500 && productSearchIdValue.includes("SLEEP")) {
                registerObjectiveProgress('time', 'exploited');
            }

            if (isSecureModeEnabled && progressState.time.codeCorrected && elapsedMilliseconds < 1000 && productSearchIdValue.includes("SLEEP")) {
                registerObjectiveProgress('time', 'mitigated');
            }
        } catch (networkCommunicationError) {
            timeBasedBlindResponseBox.innerHTML = `<div class="sql-error-message">Error de Red: ${networkCommunicationError.message}</div>`;
        }
    });

    // ==========================================
    // FORMULARIO 6: MODIFICACION (UPDATE BIO)
    // ==========================================
    const dataModificationForm = document.getElementById('update-form');
    const dataModificationResponseBox = document.getElementById('update-response');

    dataModificationForm.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();
        dataModificationResponseBox.innerHTML = 'Ejecutando modificacion del registro...';
        
        const userIdFieldValue = document.getElementById('update-user-id').value;
        const biographyFieldValue = document.getElementById('update-bio').value;
        const isSecureModeEnabled = secureModeToggle.checked;
        
        try {
            const apiResponse = await fetch('/api/users/update-bio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: userIdFieldValue, 
                    bio: biographyFieldValue, 
                    secure: isSecureModeEnabled 
                })
            });
            const responseData = await apiResponse.json();
            
            updateSqlQueryDisplay(responseData.query || responseData.error);
            
            if (responseData.success) {
                dataModificationResponseBox.innerHTML = `
                    <div class="success-badge">Perfil Actualizado</div>
                    <div style="margin-top: 10px;">
                        <strong>Mensaje de confirmacion:</strong> ${responseData.message}<br><br>
                        <span style="font-size: 12px; color: var(--text-muted);">
                            Sugerencia didactica: Puedes verificar si lograste alterar otros atributos (como escalacion de rol a administrador) intentando ingresar de nuevo con el usuario modificado.
                        </span>
                    </div>
                `;

                if (!isSecureModeEnabled && biographyFieldValue.includes("role=") && biographyFieldValue.includes("administrator")) {
                    registerObjectiveProgress('update', 'exploited');
                }

                if (isSecureModeEnabled && progressState.update.codeCorrected && biographyFieldValue.includes("role=")) {
                    registerObjectiveProgress('update', 'mitigated');
                }
            } else {
                dataModificationResponseBox.innerHTML = `
                    <div class="sql-error-message">
                        <strong>Error en Base de Datos:</strong><br>
                        <code>${responseData.error}</code>
                    </div>
                `;
            }
        } catch (networkCommunicationError) {
            dataModificationResponseBox.innerHTML = `<div class="sql-error-message">Error de Red: ${networkCommunicationError.message}</div>`;
        }
    });

    // ==========================================
    // SECCION 7: SANDBOX SQL CONSOLE & RESET DB
    // ==========================================
    const consoleSqlForm = document.getElementById('console-form');
    const consoleSqlInputArea = document.getElementById('console-sql-input');
    const consoleSqlResponseBox = document.getElementById('console-response');
    const resetDatabaseButton = document.getElementById('reset-db-btn');

    consoleSqlForm.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();
        consoleSqlResponseBox.innerHTML = 'Enviando comando SQL a la base de datos local...';
        
        const rawSqlStatement = consoleSqlInputArea.value;
        
        try {
            const apiResponse = await fetch('/api/database/console', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sqlStatement: rawSqlStatement })
            });
            const responseData = await apiResponse.json();
            
            if (apiResponse.ok) {
                if (responseData.results && Array.isArray(responseData.results) && responseData.results.length > 0) {
                    let tableTemplateHtml = `<table class="sql-result-table"><thead><tr>`;
                    const resultColumns = Object.keys(responseData.results[0]);
                    
                    resultColumns.forEach(columnName => {
                        tableTemplateHtml += `<th>${columnName}</th>`;
                    });
                    tableTemplateHtml += `</tr></thead><tbody>`;
                    
                    responseData.results.forEach(row => {
                        tableTemplateHtml += `<tr>`;
                        resultColumns.forEach(col => {
                            tableTemplateHtml += `<td>${row[col] !== null ? row[col] : '<i>NULL</i>'}</td>`;
                        });
                        tableTemplateHtml += `</tr>`;
                    });
                    tableTemplateHtml += `</tbody></table>`;
                    
                    consoleSqlResponseBox.innerHTML = tableTemplateHtml;
                } else {
                    consoleSqlResponseBox.innerHTML = `
                        <div class="success-badge">Comando Ejecutado Exitosamente</div>
                        <div style="margin-top: 10px; color: var(--accent-secure);">
                            La instruccion SQL se ejecuto correctamente en el servidor. Filas afectadas: ${responseData.results.affectedRows || 0}.
                        </div>
                    `;
                }
            } else {
                consoleSqlResponseBox.innerHTML = `
                    <div class="sql-error-message">
                        <strong>Error en Sintaxis SQL / Base de Datos:</strong><br>
                        <code>${responseData.error}</code>
                    </div>
                `;
            }
        } catch (networkCommunicationError) {
            consoleSqlResponseBox.innerHTML = `<div class="sql-error-message">Error de Red: ${networkCommunicationError.message}</div>`;
        }
    });

    resetDatabaseButton.addEventListener('click', async () => {
        consoleSqlResponseBox.innerHTML = 'Restableciendo base de datos local...';
        
        try {
            const apiResponse = await fetch('/api/database/reset', { method: 'POST' });
            const responseData = await apiResponse.json();
            
            if (apiResponse.ok) {
                consoleSqlResponseBox.innerHTML = `
                    <div class="success-badge">Base de Datos Restaurada</div>
                    <div style="margin-top: 10px; color: var(--accent-secure);">
                        ${responseData.message || 'Todas las tablas han sido limpiadas y pobladas con la informacion por defecto.'}
                    </div>
                `;
                checkDatabaseHealth();
            } else {
                consoleSqlResponseBox.innerHTML = `<div class="sql-error-message">Error al restablecer: ${responseData.error}</div>`;
            }
        } catch (networkCommunicationError) {
            consoleSqlResponseBox.innerHTML = `<div class="sql-error-message">Error de Red: ${networkCommunicationError.message}</div>`;
        }
    });
});
