/* eslint-disable no-underscore-dangle */
import { xml2js } from 'xml-js';


const parseXml = (xml) => {
  const parseOptions = {
    compact: true,
    trim: true,
    nativeType: true,
    nativeTypeAttributes: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreComment: true,
    ignoreCdata: true,
    ignoreDoctype: true,
  };

  try {
    const xmlJSON = xml2js(xml, parseOptions);
    const bbgData = xmlJSON['soap:Envelope']['soap:Body']['dlws:retrieveGetDataResponse'];
    const fieldNames = bbgData['dlws:fields']['dlws:field']
      .map(({ _text: field }) => field);
    const instrumentsData = bbgData['dlws:instrumentDatas']['dlws:instrumentData']
      .map((e) => {
        const fieldData = e['dlws:data'].map(data => data._attributes.value);
        return {
          instrumentId: e['dlws:instrument']['dlws:id']._text,
          ...fieldNames.reduce((a, v, i) => ({
            ...a,
            [v]: fieldData[i],
          }),
          {}),
        };
      });
    return JSON.stringify(instrumentsData, null, 4);
  } catch (err) {
    return 'Parsing failed...';
  }
};

export default parseXml;
