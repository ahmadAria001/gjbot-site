let isInit: boolean = false;

const setInit = (value: boolean) => {
	isInit = value;
};
const getInit = () => {
	return isInit;
};

export { setInit, getInit };
