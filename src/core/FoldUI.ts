export type FoldUISchema = unknown

export class FoldUI {
    public static render(containerEl: HTMLElement, schema: FoldUISchema) {
        const html = FoldUI.html(schema)
        containerEl.innerHTML = html
    }

    public static html(schema: FoldUISchema): string {
        return ''
    }
}
