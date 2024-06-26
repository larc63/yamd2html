const {MarkDownReader} = require('./mdreader');
const {YaMdReader} = require('./yamdreader');
const {HTMLWriter} = require('./writer');

const HEADER_KEY = '%%HEADER%%';
const TITLE_KEY = '%%TITLE%%';
const BODY_KEY = '%%BODY%%';
const HERO_KEY = '%%HERO%%';
const DESCRIPTION_KEY = '%%DESCRIPTION%%';

const yreader = new YaMdReader();
const htmlWriter = new HTMLWriter();


const applyTemplate = (p, m, t) => {
    t = t.replace(HEADER_KEY, `<title>${p.getTitle()}</title>`);
    t = t.replace(TITLE_KEY, `${p.getTitle()}`);
    t = t.replace(BODY_KEY, `${htmlWriter.getHTML(m)}`);
    t = t.replace(HERO_KEY, `<img src="${p.getHero()}">`);
    if (p.getDescription()) {
        t = t.replace(DESCRIPTION_KEY, p.getDescription());
    } else {
        t = t.replace(DESCRIPTION_KEY, 'a blog post');
    }

    return t;
}

exports.getHTML = (mdContent, template) => {
    // console.log(`Contents \n\n ${mdContent}`);
    const mreader = new MarkDownReader();
    
    yreader.setData(mdContent);
    const postData = yreader.parseHeader();

    // console.log(JSON.stringify(postData));
    mreader.parseText(yreader.body);
    // mreader.printTree();
    mreader.description = yreader.social;

    return [postData, applyTemplate(postData, mreader.getRootElement(), template), mreader.description];
}