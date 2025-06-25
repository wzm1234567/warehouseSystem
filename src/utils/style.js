const designWidth = 1920;
const designHeight = 1080;

const styleComoputed = { 
    px2vw: function (px) {
        return px / designWidth * 100 + 'vw';
    },
    px2vh: function (px) {
        return px / designHeight * 100 + 'vh';
    },
    px2font: function (px) {
        return px / designWidth * 100 + 'vw';
    }
};

export default styleComoputed;