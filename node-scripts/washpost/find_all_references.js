const _ = require("lodash")
const traverse = require("traverse")
const fs = require("fs")
const document = require('../../resources/WTY75Z2TCRB6VPBIIVHVQ32Q6E.json')
const original_stories = []
original_stories.push(document)

const related_content_whitelist = [
    'madsack',
    'washpost',
    'thelily.washpost',
    'tgam',
    'nzme',
    'mexico',
    'mco',
    'airforcetimes.mco',
    'armytimes.mco',
    'c4isrnet.mco',
    'defensenews.mco',
    'federaltimes.mco',
    'fifthdomain.mco',
    'marinecorpstimes.mco',
    'militarytimes.mco',
    'navytimes.mco',
    'rebootcamp.mco',
    'lanacionpy',
    'lanacionar',
    'gruponacion',
    'spectator',
    'pmn',
    'tbt',
    'raycom'
]
const ignore_related_content = story =>
    !related_content_whitelist.includes(story.owner.id)
        ? ({
            ...story,
            related_content: {
                liveblog: (story.related_content || {}).liveblog,
                liveblog_parent: (story.related_content || {}).liveblog_parent,
                redirect: (story.related_content || {}).redirect
            }
        })
        : story

const calculate_total_reference_in_document = ()=>{
    var referents =
        _(original_stories)
            .map(ignore_related_content)
            .flatMap(story => traverse(story).nodes())
            .filter(x =>
                x
                && x.type === 'reference'
                && x.referent
                && x.referent.type
                && x.referent.id
                && (
                    ['author', 'site', 'section', 'video', 'story', 'image', 'gallery'].includes(x.referent.type)
                    || (x.referent.provider && x.referent.service === 'oembed')
                )
                && !(x.additional_properties || {})._do_not_inflate
            )
            .map(x => x)
            .value()

    var rawReferenceCount = referents.length;
    fs.writeFile('referents_'+document._id,JSON.stringify(referents),(err)=>{
        console.log(err)
    })
    console.log(rawReferenceCount)
}

calculate_total_reference_in_document()