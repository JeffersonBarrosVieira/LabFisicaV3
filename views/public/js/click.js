window.addEventListener('load', async () => {
    await new Promise( resolve => setTimeout(resolve, 1000));
    document.getElementById('main-content').click();
})