import Editor from '@monaco-editor/react'
import { customTheme, optionsEditor } from '../styles/editorStyles'

const EditorComponent = ({ code, setCode, selectedLanguage }) => {
    return (
        <Editor
            height={'100%'}
            width={'100%'}
            language={selectedLanguage.value}
            value={code}
            onChange={(value) => setCode(value)}
            beforeMount={(monaco) => {
                monaco.editor.defineTheme('customTheme', customTheme)
                monaco.editor.setTheme('customTheme')
            }}
            theme="customTheme"
            options={optionsEditor}
        />
    )
}

export default EditorComponent
