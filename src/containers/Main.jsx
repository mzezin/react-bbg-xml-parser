import React, { useState } from 'react';
import {
  Form, TextArea, Container, Divider, Button,
} from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import parseXml from '../utils';

const Main = () => {
  const [json, setJson] = useState('');
  return (
    <Container style={{ margin: 20, padding: 20 }} textAlign="center">
      <Form>
        <TextArea
          onChange={(e, { value }) => setJson(parseXml(value))}
          style={{ resize: 'none' }}
          rows={5}
          placeholder="Enter xml data..."
        />
        <Divider />
        <TextArea
          value={json}
          style={{ resize: 'none' }}
          rows={45}
        />
        <CopyToClipboard text={json}>
          <Button style={{ margin: 10, padding: 10 }}>Copy to clipboard</Button>
        </CopyToClipboard>
      </Form>
    </Container>
  );
};

export default Main;
