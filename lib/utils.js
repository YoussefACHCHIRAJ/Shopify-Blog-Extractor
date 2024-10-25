const nameWordFile = (title) => {
    const formatTitle =  title.replace(/[\/\\:*?"<>|]/g, '').replace(/ /g, '_');
    return `${formatTitle}_${Date.now()}.docx`
}

module.exports = {
    nameWordFile
}