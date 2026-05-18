export interface NamedResource {
    name: string;
    url: string;
}

export interface PokeApiListResponse<TResource> {
    count: number;
    next: string | null;
    previous: string | null;
    results: TResource[];
}