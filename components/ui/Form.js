/**
 * Form Component
 * 다양한 폼 요소들을 생성하는 컴포넌트
 */
class Form {
    createInput(options = {}) {
        const {
            type = 'text',
            label = '',
            placeholder = '',
            value = '',
            required = false,
            disabled = false,
            error = '',
            helper = '',
            className = '',
            id = this.generateId(),
            ...otherProps
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = `form-field ${error ? 'form-field--error' : ''} ${className}`.trim();

        let html = '';

        // Label
        if (label) {
            html += `
                <label for="${id}" class="form-label ${required ? 'form-label--required' : ''}">
                    ${label}
                </label>
            `;
        }

        // Input
        html += `
            <input 
                type="${type}"
                id="${id}"
                class="form-input"
                placeholder="${placeholder}"
                value="${value}"
                ${required ? 'required' : ''}
                ${disabled ? 'disabled' : ''}
                ${Object.entries(otherProps).map(([key, val]) => `${key}="${val}"`).join(' ')}
            />
        `;

        // Helper text
        if (helper && !error) {
            html += `<div class="form-helper">${helper}</div>`;
        }

        // Error message
        if (error) {
            html += `<div class="form-error">${error}</div>`;
        }

        wrapper.innerHTML = html + this.getInputStyles();
        return wrapper;
    }

    createSelect(options = {}) {
        const {
            label = '',
            options: selectOptions = [],
            value = '',
            required = false,
            disabled = false,
            error = '',
            helper = '',
            className = '',
            id = this.generateId(),
            ...otherProps
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = `form-field ${error ? 'form-field--error' : ''} ${className}`.trim();

        let html = '';

        // Label
        if (label) {
            html += `
                <label for="${id}" class="form-label ${required ? 'form-label--required' : ''}">
                    ${label}
                </label>
            `;
        }

        // Select
        html += `
            <select 
                id="${id}"
                class="form-select"
                ${required ? 'required' : ''}
                ${disabled ? 'disabled' : ''}
                ${Object.entries(otherProps).map(([key, val]) => `${key}="${val}"`).join(' ')}
            >
                <option value="">선택하세요</option>
                ${selectOptions.map(option => {
                    if (typeof option === 'string') {
                        return `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`;
                    }
                    return `<option value="${option.value}" ${value === option.value ? 'selected' : ''}>${option.label}</option>`;
                }).join('')}
            </select>
        `;

        // Helper text
        if (helper && !error) {
            html += `<div class="form-helper">${helper}</div>`;
        }

        // Error message
        if (error) {
            html += `<div class="form-error">${error}</div>`;
        }

        wrapper.innerHTML = html + this.getSelectStyles();
        return wrapper;
    }

    createTextarea(options = {}) {
        const {
            label = '',
            placeholder = '',
            value = '',
            rows = 4,
            required = false,
            disabled = false,
            error = '',
            helper = '',
            className = '',
            id = this.generateId(),
            ...otherProps
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = `form-field ${error ? 'form-field--error' : ''} ${className}`.trim();

        let html = '';

        // Label
        if (label) {
            html += `
                <label for="${id}" class="form-label ${required ? 'form-label--required' : ''}">
                    ${label}
                </label>
            `;
        }

        // Textarea
        html += `
            <textarea 
                id="${id}"
                class="form-textarea"
                placeholder="${placeholder}"
                rows="${rows}"
                ${required ? 'required' : ''}
                ${disabled ? 'disabled' : ''}
                ${Object.entries(otherProps).map(([key, val]) => `${key}="${val}"`).join(' ')}
            >${value}</textarea>
        `;

        // Helper text
        if (helper && !error) {
            html += `<div class="form-helper">${helper}</div>`;
        }

        // Error message
        if (error) {
            html += `<div class="form-error">${error}</div>`;
        }

        wrapper.innerHTML = html + this.getTextareaStyles();
        return wrapper;
    }

    createCheckbox(options = {}) {
        const {
            label = '',
            checked = false,
            disabled = false,
            className = '',
            id = this.generateId(),
            ...otherProps
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = `form-checkbox ${className}`.trim();

        const html = `
            <input 
                type="checkbox"
                id="${id}"
                class="form-checkbox-input"
                ${checked ? 'checked' : ''}
                ${disabled ? 'disabled' : ''}
                ${Object.entries(otherProps).map(([key, val]) => `${key}="${val}"`).join(' ')}
            />
            <label for="${id}" class="form-checkbox-label">${label}</label>
            ${this.getCheckboxStyles()}
        `;

        wrapper.innerHTML = html;
        return wrapper;
    }

    createRadioGroup(options = {}) {
        const {
            name,
            label = '',
            options: radioOptions = [],
            value = '',
            disabled = false,
            className = '',
            ...otherProps
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = `form-radio-group ${className}`.trim();

        let html = '';

        // Group label
        if (label) {
            html += `<div class="form-radio-group-label">${label}</div>`;
        }

        // Radio options
        html += `<div class="form-radio-options">`;
        radioOptions.forEach((option, index) => {
            const id = this.generateId();
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            
            html += `
                <div class="form-radio">
                    <input 
                        type="radio"
                        id="${id}"
                        name="${name}"
                        value="${optionValue}"
                        class="form-radio-input"
                        ${value === optionValue ? 'checked' : ''}
                        ${disabled ? 'disabled' : ''}
                        ${Object.entries(otherProps).map(([key, val]) => `${key}="${val}"`).join(' ')}
                    />
                    <label for="${id}" class="form-radio-label">${optionLabel}</label>
                </div>
            `;
        });
        html += '</div>';

        wrapper.innerHTML = html + this.getRadioStyles();
        return wrapper;
    }

    createSearchInput(options = {}) {
        const {
            placeholder = '검색어를 입력하세요',
            onSearch = null,
            onChange = null,
            className = '',
            id = this.generateId(),
            ...otherProps
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = `form-search ${className}`.trim();

        const html = `
            <div class="form-search-wrapper">
                <input 
                    type="search"
                    id="${id}"
                    class="form-search-input"
                    placeholder="${placeholder}"
                    ${Object.entries(otherProps).map(([key, val]) => `${key}="${val}"`).join(' ')}
                />
                <button type="button" class="form-search-button" aria-label="검색">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            ${this.getSearchStyles()}
        `;

        wrapper.innerHTML = html;

        // 이벤트 리스너 추가
        if (onSearch || onChange) {
            setTimeout(() => {
                const input = wrapper.querySelector('.form-search-input');
                const button = wrapper.querySelector('.form-search-button');

                if (onChange) {
                    input.addEventListener('input', (e) => onChange(e.target.value));
                }

                if (onSearch) {
                    const handleSearch = () => onSearch(input.value);
                    button.addEventListener('click', handleSearch);
                    input.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') handleSearch();
                    });
                }
            }, 0);
        }

        return wrapper;
    }

    createFileUpload(options = {}) {
        const {
            label = '파일 업로드',
            accept = '*/*',
            multiple = false,
            maxSize = 10,
            onChange = null,
            className = '',
            id = this.generateId(),
            ...otherProps
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = `form-file-upload ${className}`.trim();

        const html = `
            <div class="form-file-upload-wrapper">
                <label for="${id}" class="form-label">${label}</label>
                <div class="form-file-drop-zone">
                    <input 
                        type="file"
                        id="${id}"
                        class="form-file-input"
                        accept="${accept}"
                        ${multiple ? 'multiple' : ''}
                        ${Object.entries(otherProps).map(([key, val]) => `${key}="${val}"`).join(' ')}
                    />
                    <div class="form-file-content">
                        <i class="fas fa-cloud-upload-alt form-file-icon"></i>
                        <p class="form-file-text">파일을 선택하거나 여기에 드래그하세요</p>
                        <p class="form-file-limit">최대 ${maxSize}MB, ${accept === 'image/*' ? '이미지 파일만' : '모든 파일'} 지원</p>
                    </div>
                </div>
                <div class="form-file-list"></div>
            </div>
            ${this.getFileUploadStyles()}
        `;

        wrapper.innerHTML = html;

        // 이벤트 리스너 추가
        setTimeout(() => {
            const input = wrapper.querySelector('.form-file-input');
            const dropZone = wrapper.querySelector('.form-file-drop-zone');
            const fileList = wrapper.querySelector('.form-file-list');

            const handleFiles = (files) => {
                fileList.innerHTML = '';
                Array.from(files).forEach(file => {
                    if (file.size > maxSize * 1024 * 1024) {
                        alert(`파일 크기가 ${maxSize}MB를 초과합니다.`);
                        return;
                    }
                    
                    const fileItem = document.createElement('div');
                    fileItem.className = 'form-file-item';
                    fileItem.innerHTML = `
                        <span class="form-file-name">${file.name}</span>
                        <span class="form-file-size">(${(file.size / 1024 / 1024).toFixed(2)}MB)</span>
                    `;
                    fileList.appendChild(fileItem);
                });

                if (onChange) onChange(files);
            };

            input.addEventListener('change', (e) => handleFiles(e.target.files));

            // 드래그 앤 드롭
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
            });

            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.classList.add('form-file-drop-zone--active');
                });
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.classList.remove('form-file-drop-zone--active');
                });
            });

            dropZone.addEventListener('drop', (e) => {
                handleFiles(e.dataTransfer.files);
            });
        }, 0);

        return wrapper;
    }

    createTagInput(options = {}) {
        const {
            label = '태그',
            placeholder = '태그를 입력하고 Enter를 누르세요',
            tags = [],
            maxTags = 10,
            onChange = null,
            className = '',
            id = this.generateId(),
            ...otherProps
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = `form-tag-input ${className}`.trim();

        const html = `
            <div class="form-tag-wrapper">
                <label for="${id}" class="form-label">${label}</label>
                <div class="form-tag-container">
                    <div class="form-tag-list"></div>
                    <input 
                        type="text"
                        id="${id}"
                        class="form-tag-input-field"
                        placeholder="${placeholder}"
                        ${Object.entries(otherProps).map(([key, val]) => `${key}="${val}"`).join(' ')}
                    />
                </div>
            </div>
            ${this.getTagInputStyles()}
        `;

        wrapper.innerHTML = html;

        // 태그 관리 로직
        setTimeout(() => {
            const input = wrapper.querySelector('.form-tag-input-field');
            const tagList = wrapper.querySelector('.form-tag-list');
            let currentTags = [...tags];

            const renderTags = () => {
                tagList.innerHTML = currentTags.map(tag => `
                    <span class="form-tag">
                        ${tag}
                        <button type="button" class="form-tag-remove" data-tag="${tag}">×</button>
                    </span>
                `).join('');
            };

            const addTag = (tag) => {
                const trimmedTag = tag.trim();
                if (trimmedTag && !currentTags.includes(trimmedTag) && currentTags.length < maxTags) {
                    currentTags.push(trimmedTag);
                    renderTags();
                    if (onChange) onChange(currentTags);
                }
            };

            const removeTag = (tagToRemove) => {
                currentTags = currentTags.filter(tag => tag !== tagToRemove);
                renderTags();
                if (onChange) onChange(currentTags);
            };

            // 초기 태그 렌더링
            renderTags();

            // 이벤트 리스너
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag(input.value);
                    input.value = '';
                }
            });

            tagList.addEventListener('click', (e) => {
                if (e.target.classList.contains('form-tag-remove')) {
                    removeTag(e.target.dataset.tag);
                }
            });
        }, 0);

        return wrapper;
    }

    generateId() {
        return 'form-' + Math.random().toString(36).substr(2, 9);
    }

    getInputStyles() {
        return `
            <style>
                .form-field {
                    margin-bottom: var(--spacing-lg);
                }
                
                .form-label {
                    display: block;
                    font-weight: var(--font-weight-medium);
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-sm);
                    font-size: var(--font-size-md);
                }
                
                .form-label--required::after {
                    content: ' *';
                    color: var(--error-color, #e74c3c);
                }
                
                .form-input {
                    width: 100%;
                    padding: var(--spacing-md);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-md);
                    font-family: inherit;
                    transition: border-color var(--transition-fast);
                    background: var(--bg-white);
                }
                
                .form-input:focus {
                    outline: none;
                    border-color: var(--primary-main);
                    box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1);
                }
                
                .form-input:disabled {
                    background: var(--bg-light);
                    color: var(--text-tertiary);
                    cursor: not-allowed;
                }
                
                .form-field--error .form-input {
                    border-color: var(--error-color, #e74c3c);
                }
                
                .form-helper {
                    margin-top: var(--spacing-xs);
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                }
                
                .form-error {
                    margin-top: var(--spacing-xs);
                    font-size: var(--font-size-sm);
                    color: var(--error-color, #e74c3c);
                }
            </style>
        `;
    }

    getSelectStyles() {
        return `
            <style>
                .form-select {
                    width: 100%;
                    padding: var(--spacing-md);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-md);
                    font-family: inherit;
                    background: var(--bg-white);
                    cursor: pointer;
                    transition: border-color var(--transition-fast);
                }
                
                .form-select:focus {
                    outline: none;
                    border-color: var(--primary-main);
                    box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1);
                }
                
                .form-select:disabled {
                    background: var(--bg-light);
                    color: var(--text-tertiary);
                    cursor: not-allowed;
                }
            </style>
        `;
    }

    getTextareaStyles() {
        return `
            <style>
                .form-textarea {
                    width: 100%;
                    padding: var(--spacing-md);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-md);
                    font-family: inherit;
                    resize: vertical;
                    min-height: 100px;
                    transition: border-color var(--transition-fast);
                    background: var(--bg-white);
                }
                
                .form-textarea:focus {
                    outline: none;
                    border-color: var(--primary-main);
                    box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1);
                }
                
                .form-textarea:disabled {
                    background: var(--bg-light);
                    color: var(--text-tertiary);
                    cursor: not-allowed;
                }
            </style>
        `;
    }

    getCheckboxStyles() {
        return `
            <style>
                .form-checkbox {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    margin-bottom: var(--spacing-md);
                }
                
                .form-checkbox-input {
                    width: 18px;
                    height: 18px;
                    margin: 0;
                }
                
                .form-checkbox-label {
                    font-size: var(--font-size-md);
                    color: var(--text-primary);
                    cursor: pointer;
                    margin: 0;
                }
                
                .form-checkbox-input:disabled + .form-checkbox-label {
                    color: var(--text-tertiary);
                    cursor: not-allowed;
                }
            </style>
        `;
    }

    getRadioStyles() {
        return `
            <style>
                .form-radio-group {
                    margin-bottom: var(--spacing-lg);
                }
                
                .form-radio-group-label {
                    font-weight: var(--font-weight-medium);
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-sm);
                    font-size: var(--font-size-md);
                }
                
                .form-radio-options {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                }
                
                .form-radio {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }
                
                .form-radio-input {
                    width: 18px;
                    height: 18px;
                    margin: 0;
                }
                
                .form-radio-label {
                    font-size: var(--font-size-md);
                    color: var(--text-primary);
                    cursor: pointer;
                    margin: 0;
                }
                
                .form-radio-input:disabled + .form-radio-label {
                    color: var(--text-tertiary);
                    cursor: not-allowed;
                }
            </style>
        `;
    }

    getSearchStyles() {
        return `
            <style>
                .form-search {
                    margin-bottom: var(--spacing-lg);
                }
                
                .form-search-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                
                .form-search-input {
                    flex: 1;
                    padding: var(--spacing-md);
                    padding-right: 50px;
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-md);
                    font-family: inherit;
                    transition: border-color var(--transition-fast);
                    background: var(--bg-white);
                }
                
                .form-search-input:focus {
                    outline: none;
                    border-color: var(--primary-main);
                    box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1);
                }
                
                .form-search-button {
                    position: absolute;
                    right: 8px;
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: var(--spacing-sm);
                    border-radius: var(--radius-sm);
                    transition: color var(--transition-fast);
                }
                
                .form-search-button:hover {
                    color: var(--primary-main);
                }
            </style>
        `;
    }

    getFileUploadStyles() {
        return `
            <style>
                .form-file-upload {
                    margin-bottom: var(--spacing-lg);
                }
                
                .form-file-drop-zone {
                    border: 2px dashed var(--border-light);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-xl);
                    text-align: center;
                    background: var(--bg-light);
                    transition: all var(--transition-fast);
                    cursor: pointer;
                    position: relative;
                }
                
                .form-file-drop-zone:hover,
                .form-file-drop-zone--active {
                    border-color: var(--primary-main);
                    background: rgba(212, 165, 116, 0.05);
                }
                
                .form-file-input {
                    position: absolute;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }
                
                .form-file-icon {
                    font-size: var(--font-size-xxl);
                    color: var(--primary-main);
                    margin-bottom: var(--spacing-sm);
                }
                
                .form-file-text {
                    font-size: var(--font-size-md);
                    color: var(--text-primary);
                    margin: 0 0 var(--spacing-xs) 0;
                }
                
                .form-file-limit {
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                    margin: 0;
                }
                
                .form-file-list {
                    margin-top: var(--spacing-md);
                }
                
                .form-file-item {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    padding: var(--spacing-sm);
                    background: var(--bg-white);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-sm);
                    margin-bottom: var(--spacing-xs);
                }
                
                .form-file-name {
                    flex: 1;
                    font-size: var(--font-size-md);
                    color: var(--text-primary);
                }
                
                .form-file-size {
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                }
            </style>
        `;
    }

    getTagInputStyles() {
        return `
            <style>
                .form-tag-input {
                    margin-bottom: var(--spacing-lg);
                }
                
                .form-tag-container {
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-sm);
                    background: var(--bg-white);
                    min-height: 48px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: var(--spacing-xs);
                }
                
                .form-tag-container:focus-within {
                    border-color: var(--primary-main);
                    box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1);
                }
                
                .form-tag-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--spacing-xs);
                }
                
                .form-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    background: var(--primary-main);
                    color: white;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-sm);
                    font-size: var(--font-size-sm);
                }
                
                .form-tag-remove {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                    line-height: 1;
                    padding: 0;
                    margin: 0;
                }
                
                .form-tag-remove:hover {
                    opacity: 0.8;
                }
                
                .form-tag-input-field {
                    flex: 1;
                    min-width: 200px;
                    border: none;
                    outline: none;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    font-size: var(--font-size-md);
                    background: transparent;
                }
            </style>
        `;
    }
}

export default Form;