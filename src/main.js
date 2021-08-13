const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'C', url: 'https://www.csdn.net' },
    { logo: 'D', url: 'https://www.douban.com' },
    { logo: 'E', url: 'https://www.ele.me' },
    { logo: 'G', url: 'https://github.com' },
];

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')

}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
         <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}<div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation(); //阻止冒泡
            hashMap.splice(index, 1)
            render();
        })
    })
}

render();

$('.addButton').on('click', () => {
    let url = window.prompt('请输入想添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url);
    hashMap.push(
        {
            logo: simplifyUrl(url)[0].toUpperCase(),
            logoType: 'text',
            url: url
        }
    );
    render();
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}