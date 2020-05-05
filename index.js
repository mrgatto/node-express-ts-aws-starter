var rect = {
    pemirimter: (x, y) => 2 * (x + y),
    area: (x, y) => x * y
}

function area(a, b) {
    return rect.area(a, b);
}

console.log("Area: " + area(3, 5));