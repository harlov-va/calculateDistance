import style from './DeleteButton.module.scss';
import { IDeleteButtonProps } from './types';

const DeleteButton = (props: IDeleteButtonProps) => {
	const { onClick } = props;
	return (
		<button aria-label="delete-button" className={style.button} onClick={onClick}>
			<img src="./delete.png" alt="delete" />
		</button>
	);
};
export default DeleteButton;
