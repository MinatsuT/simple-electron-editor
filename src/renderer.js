let currentFilePath = null;
let textChanged = false;

document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.getElementById('text-editor');
    const statusBar = document.getElementById('status-bar');
    
    // テキスト変更の監視
    textArea.addEventListener('input', () => {
        textChanged = true;
        updateStatusBar();
    });
  
    // ステータスバーの更新
    function updateStatusBar() {
        if (statusBar) {
            statusBar.textContent = currentFilePath 
                ? `${textChanged ? '* ' : ''}${currentFilePath}`
                : '新規ファイル' + (textChanged ? ' *' : '');
        }
    }
    
    // メニューからの新規作成指示
    window.addEventListener('file:new', () => {
        if (confirmDiscardChanges()) {
            textArea.value = '';
            currentFilePath = null;
            textChanged = false;
            updateStatusBar();
        }
    });
    
    // メニューからの保存指示
    window.addEventListener('file:save', saveFile);
    
    // メニューからの名前を付けて保存指示
    window.addEventListener('file:saveAs', saveFileAs);
    
    // メインプロセスからのファイルオープン指示
    window.addEventListener('file:open', (e) => {
        if (confirmDiscardChanges()) {
            const { filePath, content } = e.detail;
            textArea.value = content;
            currentFilePath = filePath;
            textChanged = false;
            updateStatusBar();
        }
    });
    
    async function saveFile() {
        if (!window.electronAPI) return;
        
        const text = textArea.value;
        
        // 既存ファイルの場合は上書き保存
        if (currentFilePath) {
            const success = await window.electronAPI.saveExistingFile(currentFilePath, text);
            if (success) {
                textChanged = false;
                updateStatusBar();
            }
            return;
        }
        
        // 新規ファイルの場合は保存ダイアログを表示
        const filePath = await window.electronAPI.saveFile(text);
        
        if (filePath) {
            currentFilePath = filePath;
            textChanged = false;
            updateStatusBar();
        }
    }
    
    // 名前を付けて保存関数
    async function saveFileAs() {
        if (!window.electronAPI) return;
        
        const text = textArea.value;
        // 常に保存ダイアログを表示
        const filePath = await window.electronAPI.saveFile(text);
        
        if (filePath) {
            currentFilePath = filePath;
            textChanged = false;
            updateStatusBar();
        }
    }
    
    // ファイルを開く関数
    async function openFile() {
        if (!window.electronAPI) return;
        
        if (confirmDiscardChanges()) {
            const result = await window.electronAPI.openFile();
            if (result) {
                textArea.value = result.content;
                currentFilePath = result.filePath;
                textChanged = false;
                updateStatusBar();
            }
        }
    }
    
    // 未保存の変更がある場合に確認
    function confirmDiscardChanges() {
        if (textChanged) {
            return confirm('未保存の変更があります。破棄してもよろしいですか？');
        }
        return true;
    }
    
    // キーボードショートカット
    document.addEventListener('keydown', (e) => {
        // Ctrl+O または Cmd+O
        if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
            e.preventDefault();
            openFile();
        }
        
        // Ctrl+S または Cmd+S
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveFile();
        }
        
        // Ctrl+Shift+S または Cmd+Shift+S (名前を付けて保存)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 's') {
            e.preventDefault();
            saveFileAs();
        }
    });
    
    // ファイルをドロップする機能の追加
    document.body.addEventListener('dragover', (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    
    document.body.addEventListener('drop', async (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (e.dataTransfer.files.length) {
            // 未保存の変更がある場合は確認ダイアログを表示する（この動作は残す）
            if (confirmDiscardChanges()) {
                const file = e.dataTransfer.files[0];
                // ドロップされたファイルのパスを使用して直接開く
                const result = await window.electronAPI.openFileByPath(file.path);
                if (result) {
                    textArea.value = result.content;
                    currentFilePath = result.filePath;
                    textChanged = false;
                    updateStatusBar();
                }
            }
        }
    });
    
    // 初期状態のステータスバー更新
    updateStatusBar();
});