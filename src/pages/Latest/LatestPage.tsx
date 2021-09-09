import React from 'react';
import ReactMarkdown from 'react-markdown';
import raw from 'raw.macro';
import { Card } from 'antd';
const changelogMarkdown = raw('../../../CHANGELOG.md');

export const LatestPage = () => {
  return (
    <Card>
      <ReactMarkdown>{changelogMarkdown}</ReactMarkdown>
    </Card>
  );
};
