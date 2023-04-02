import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import style from './Result.module.scss';
import Trip from '../../components/Trip/Trip';
import { makeURL } from '../../utils';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchDistancesAction, selectDistances, selectError } from '../../redux/city/citySlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

function Result() {
	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const distances = useTypedSelector(selectDistances);
	const [cities, total] = distances;
	const [loading, setLoading] = useState(false);
	const error = useTypedSelector(selectError);
	if (error) throw new Error();

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const str = searchParams.get('params') ?? '';
				await dispatch(fetchDistancesAction({ params: str }));
			} catch (e) {
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [searchParams, dispatch]);

	let options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};

	if (loading) return <div className={style.loading}>Calculating the trip...</div>;

	return (
		<div className={style.container}>
			<div className="stepper">
				<Trip distances={cities} />
			</div>
			<div className={style.info}>
				{total && (
					<div className="total">
						<span className={style.highlight}>{(total / 1000).toFixed(2)}</span> km is total
						distance
					</div>
				)}
				<div className={style.passengers}>
					<span className={style.highlight}>{searchParams.get('count')}</span> passengers
				</div>
				<div className="date">
					<span className={style.highlight}>
						{new Intl.DateTimeFormat('en-US', options).format(
							new Date(searchParams.get('date') ?? new Date()),
						)}
					</span>
				</div>
			</div>
			<div className={style.submit}>
				<Button
					onClick={() =>
						navigate(
							makeURL(
								searchParams.get('params') ?? '',
								searchParams.get('count') ?? '',
								searchParams.get('date') ?? '',
							),
						)
					}
				>
					Back
				</Button>
			</div>
		</div>
	);
}

export default Result;
