function updateFooterTime() {
    const footerTime = document.getElementById('footer-info');
    const date = new Date();
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const formattedDate = date.toLocaleDateString(undefined, options);
    footerTime.innerHTML = formattedDate;
  }
  
  setInterval(updateFooterTime, 1000);
  
  updateFooterTime();