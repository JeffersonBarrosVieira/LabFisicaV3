window.addEventListener('load', async () => {
    await new Promise( resolve => setTimeout(resolve, 2000));
    document.getElementById('main-content').click();
})