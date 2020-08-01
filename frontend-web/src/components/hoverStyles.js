const K_SIZE = 40;

const greatPlaceStyle = {
    position: 'absolute',
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    top: -K_SIZE / 2,
    textAlign: 'center',
    color: '#f35588',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: "transform 0.2s"
};

const greatPlaceStyleHover = {
    ...greatPlaceStyle,
    transform: "scale(1.3)"
};

export {greatPlaceStyle, greatPlaceStyleHover, K_SIZE};