import { LinkIcon } from '@heroicons/react/outline';
import Button, { ButtonVariant } from '../Button';
import IconButton, { IconButtonVariant } from '../IconButton';
import toast from 'react-hot-toast';
import useCopyToClipboard from '../../Hooks/useCopyToClipboard';
import { useNavigate } from 'react-router-dom';

type Props = {
  question: string;
  startDate: string;
  endDate: string;
  id: string;
};

export default function SurveyRow({ question, startDate, endDate, id }: Props) {
  const [, copy] = useCopyToClipboard();
  const navigate = useNavigate();

  const handleCopyLink = () => {
    const domain =
      window.location.hostname === 'localhost' ? 'http://' : 'https://';
    const link = `${domain}${window.location.host}/survey/${id}`;
    copy(link);
    toast.success('Link copied to clipboard');
  };

  const handleOnMoreButton = () => {
    navigate(`/survey/answer/${id}`);
  };

  return (
    <div className="flex max-w-full flex-col w-[600px] my-2 md:flex-row">
      <div className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-md rounded-b-none shadow-sm md:rounded-b-md">
        <div>{question}</div>
        <div className="flex items-center space-x-2">
          <div>{startDate}</div>
          <div>-</div>
          <div>{endDate}</div>
        </div>
      </div>
      <div className="flex w-full md:w-auto md:ml-2">
        <Button
          variant={ButtonVariant.OUTLINE}
          className="p-2 mr-2 sm:mt-0 mt-2 w-full md:w-auto md:rounded-t-md md:border-t-[1px]"
          onClick={handleOnMoreButton}
        >
          More
        </Button>

        <IconButton
          variant={IconButtonVariant.PRIMARY}
          className={
            'pl-4 pr-3 sm:mt-0 mt-2 w-full text-center justify-center md:w-auto md:rounded-t-md'
          }
          title="Copy link to clipboard"
          icon={<LinkIcon className="w-5 h-5" />}
          onClick={handleCopyLink}
        ></IconButton>
      </div>
    </div>
  );
}
