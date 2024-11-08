import { useContext, useState } from 'react';
import PagedTable from '../../components/PagedTable';
import AppContext from '../../context';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@chakra-ui/react';
import BoxModal from '../Boxes/components/BoxModal';
import { timeAgo } from '../../service/utils';

export default function Scans() {
	const { boxes } = useContext(AppContext);
	const { t } = useTranslation();
	const [selectedBox, setSelectedBox] = useState(null);
	const { isOpen, onClose, onOpen } = useDisclosure();

	const scans = boxes
					.map(box => box.scans.map(scan => ({
						...scan,
						boxId: box.id,
						recipient: box.school
					})))
					.flat()
					.sort((a, b) => new Date(b.time) - new Date(a.time));

	const handleClick = (element) => {
		setSelectedBox(element.boxId);
		onOpen();
	}

	return (
		<>
			{selectedBox &&
				<BoxModal
					box={boxes.find(box => box.id === selectedBox)}
					onClose={onClose}
					isOpen={isOpen}
				/>
			}
			<PagedTable
				elements={scans}
				headers={[
					t('recipient'),
					t('box'),
					t('time'),
					t('comment'),
					t('received'),
					t('reachedGps')
				]}
				fields={[
					'recipient',
					'boxId',
					'time',
					'comment',
					'markedAsReceived',
					'finalDestination',
				]}
				transforms={{
					time: (time) => timeAgo(time),
					boxId: (boxId) => <code>{`${boxId.slice(0, 5)}...`}</code>
				}}
				onRowClick={handleClick}
			/>
		</>
	)
}
