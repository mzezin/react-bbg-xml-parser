import React, { useState } from 'react';
import {
  Form, TextArea, Container, Divider, Button,
} from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import parseXml from '../utils';

const Main = () => {
  const [xml, setXml] = useState('');
  const [json, setJson] = useState('');
  return (
    <Container style={{ margin: 20, padding: 20 }} textAlign="center">
      <Form>
        <TextArea
          value={xml}
          onChange={(e, { value }) => {
            setXml(value);
            setJson(parseXml(value));
          }}
          style={{ resize: 'none' }}
          rows={5}
          placeholder="Enter xml data..."
        />
        <Divider />
        <TextArea
          value={json}
          style={{ resize: 'none' }}
          rows={30}
        />
        <CopyToClipboard text={json}>
          <Button style={{ margin: 10, padding: 10 }}>Copy to clipboard</Button>
        </CopyToClipboard>
        <Button
          style={{ margin: 10, padding: 10 }}
          onClick={() => {
            setXml('');
            setJson('');
          }}
        >
          Clear Data
        </Button>
      </Form>
    </Container>
  );
};

export default Main;
