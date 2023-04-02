import style from './TextButton.module.scss';
import { ITextButtonProps } from './types';

const TextButton = (props: React.PropsWithChildren<ITextButtonProps>) => {
	const { onClick, children } = props;
	return (
		<button onClick={onClick} className={style.link}>
			{children}
		</button>
	);
};
export default TextButton;
