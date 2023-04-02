import { ReactNode } from 'react';

export interface IStepProps {
	lastStep?: boolean;
	onDelete?: () => void;
	separator?: ReactNode;
}
