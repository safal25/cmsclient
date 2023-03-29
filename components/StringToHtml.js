import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

function StringToHtml(props) {
  // Use ReactDOMServer to convert the HTML string to JSX
  const jsx = ReactDOMServer.renderToStaticMarkup(
    <div dangerouslySetInnerHTML={{ __html: props.content }} />
  );

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.style) {
        domNode.attribs.style="";
      }
    },
  };

  return parse(props.content,options);
}

export default StringToHtml;