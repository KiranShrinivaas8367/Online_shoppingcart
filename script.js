const script = ()=>{
    const nav = document.querySelector('#main')
    const topNav = nav.offsetTop;

    window.addEventListener('scroll',fixNav);

    function fixNav(){
        if(window.scrollY >= topNav)
        {
            document.documentElement.classList.add('fixed-nav')
            document.body.style.paddingTop = nav.offsetHeight + 'px';
        }
        else
        {
            document.documentElement.classList.remove('fixed-nav')
            document.body.style.paddingTop = 0 + 'px';
        }
    }
}
export default script;