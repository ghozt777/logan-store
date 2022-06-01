export function setLoaderInactive() {
    document.querySelector<HTMLElement>('.loader')?.style.setProperty('display', 'none');
}