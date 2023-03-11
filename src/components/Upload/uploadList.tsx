import React, { FC } from 'react';
import { UploadFile } from '.';
import Icon from '../Icon';
import Progress from '../Progress';

export interface UploadListProps {
  onRemove: (file: UploadFile) => void;
  fileList: UploadFile[];
};

const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className='upload-list'>
      {fileList.map(file => {
        return (
          <li className='upload-list-item' key={file.uid}>
            <span className={`file-name file-name-${file.status}`}>
              <Icon icon='file-alt' theme='secondary' />
              {file.name}
            </span>
            <span className='file-status'>
              {(file.status === 'uploading' || file.status === 'ready') && <Icon icon={'spinner'} spin theme='primary' />}
              {file.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {file.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className='file-action'>
              <Icon icon="times" onClick={() => { onRemove(file) }} />
            </span>
            {
              file.status === 'uploading' &&
              <Progress percent={file.percentage || 0} />
            }
          </li>
        )
      })}
    </ul>
  )
};

export default UploadList;