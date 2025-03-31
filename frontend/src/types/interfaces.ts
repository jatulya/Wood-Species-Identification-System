export type Result = {
    predicted_class:string;
    confidence: number;
    scientific_name: string;
    common_name: string;
    areas_found: string[];
    best_used_for: string[];
    not_suitable_for: string[];
    price_range: string;
};

export type ResultProps = {
    result: Result;
    imageUrl: string;
};