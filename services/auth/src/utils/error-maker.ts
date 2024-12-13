export const ErrorMaker = (eName: string, eMessage: string, status: number) => {
	const name = new Error(eName).name;
	const message = new Error(eMessage).message;
	return { name, message, status };
};
