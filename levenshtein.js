/*
Copyright (c) 2011 Andrei Mackenzie
*/

function levenshtein(a,b) {
    if(a.length === 0) return b.length;
    if(b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                               Math.min(matrix[i][j-1] + 1, // insertion
                                        matrix[i-1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
}
//console.log(levenshtein(a, b));

function prediction(unknown,autistic,normal){
    var comparisonUnknownAutistic = levenshtein(unknown,autistic);
    var comparisonUnknownNormal = levenshtein(unknown,normal);
    var similarityRate;

    if(comparisonUnknownNormal < comparisonUnknownAutistic){
        similarityRate = 1 - (comparisonUnknownNormal/Math.max(unknown.length,normal.length));
        return ["NORMAL",similarityRate];
    }

    else if (comparisonUnknownAutistic < comparisonUnknownNormal) {
        similarityRate = 1 - (comparisonUnknownAutistic/Math.max(unknown.length,autistic.length));
        return ["AUTISTIC",similarityRate];
    }

    else {
        similarityRate = 1 - (comparisonUnknownAutistic/Math.max(unknown.length,autistic.length));
        return ["SYSTEM CANNOT DECIDE",similarityRate];
    }
}
