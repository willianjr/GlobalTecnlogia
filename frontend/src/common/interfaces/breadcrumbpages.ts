import {ReactNode} from "react";

export default interface IBreadCrumbPages {
	page?: string;
	link?: string;
	active?: boolean;
	children?:ReactNode;
}
