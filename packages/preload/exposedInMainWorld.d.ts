interface Window {
    /**
     * Expose Environment versions.
     * @example
     * console.log( window.versions )
     */
    readonly versions: NodeJS.ProcessVersions;
    /**
     * Safe expose node.js API
     * @example
     * window.nodeCrypto('data')
     */
    readonly nodeCrypto: { sha256sum(data: import("crypto").BinaryLike): string; };
    /** Share Context with renderer process */
    readonly electron_window: { tcmContext: { open_url(url: string): void; onOpenModal(): string; openModal(name: string): void; }; };
}
