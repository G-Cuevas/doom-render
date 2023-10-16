export const sin = [];
export const cos = [];

export const calculateAngles = () => {
    for (let i = 0; i < 360; i++) {
        sin.push(Math.sin(i * Math.PI / 180));
        cos.push(Math.cos(i * Math.PI / 180));
    }
}

export const radToDeg = (rad) => {
    return rad * 180 / Math.PI;
}

export const degToRad = (deg) => {
    return deg * Math.PI / 180;
}

export const normalizeDegAngle = (angle) => {
    angle = angle % 360;
    if (angle < 0) angle += 360;
    return angle;
}