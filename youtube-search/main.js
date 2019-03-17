$(document).ready(() => {
  const form = document.getElementById("search");
  const input = document.getElementById("keyword");
  document.getElementById("btn-search").addEventListener("click", event => {
    event.preventDefault();
    document.getElementById('loading').style.transform = "scale(1)";
    document.getElementById("result-list").innerHTML = "";
    $.ajax({
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${
        input.value
      }&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
      type: "get",
      async: false,
      success: data => {
        //`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input.value}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${data.nextPageToken}`;
        for (let i = 0; i < data.items.length; ++i) {
          $("#result-list").append(
            `
                <a class="result col-md-12" href="https://www.youtube.com/watch?v=${
                  data.items[i].id.videoId
                }?autoplay=true" target="_blank">
                <img src="${
                  data.items[i].snippet.thumbnails.medium.url
                }" alt="">
                <div class="video_info">
                <h2 class="title"> ${data.items[i].snippet.title} </h2>
                <p class="description"> ${
                  data.items[i].snippet.description
                } </p>
                <span> View >> </span>
                </div>
                </a> 
                `
          );
          document.getElementById('loading').style.transform = "scale(0)";;
        }
        $(window).scroll(() => {
          if (
            $(window).scrollTop() + $(window).height() ==
            $(document).height() 
          )
          {
          document.getElementById('loading').style.transform = "scale(1)";
            $.ajax({
              url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${
                input.value
              }&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${
                data.nextPageToken
              }`,
              type: "get",
              async: false,
              success: data => {
                if(data==null) window.alert("Out of list");
                //`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input.value}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${data.nextPageToken}`;
                for (let i = 0; i < data.items.length; ++i) {
                  $("#result-list").append(
                    `
                <a class="result col-md-12" href="https://www.youtube.com/watch?v=${
                  data.items[i].id.videoId
                }?autoplay=true" target="_blank">
                <img src="${
                  data.items[i].snippet.thumbnails.medium.url
                }" alt="">
                <div class="video_info">
                <h2 class="title"> ${data.items[i].snippet.title} </h2>
                <p class="description"> ${
                  data.items[i].snippet.description
                } </p>
                <span> View >> </span>
                </div>
                </a> 
                `
                  );
                };
                document.getElementById('loading').style.transform = "scale(0)";
              }
            });
          }
        });  
      }
    });
  });
  document.getElementById("keyword").addEventListener('input', debounce(function(event) {
    document.getElementById("btn-search").click();
  }, 1000));
});

function debounce(func, wait, immediate) {
  var timeout;

  // This is the function that is actually executed when
  // the DOM event is triggered.
  return function executedFunction() {
    // Store the context of this and any
    // parameters passed to executedFunction
    var context = this;
    var args = arguments;
	    
    // The function to be called after 
    // the debounce time has elapsed
    var later = function() {
      // null timeout to indicate the debounce ended
      timeout = null;
	    
      // Call function now if you did not on the leading end
      if (!immediate) func.apply(context, args);
    };

    // Determine if you should call the function
    // on the leading or trail end
    var callNow = immediate && !timeout;
	
    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the 
    // inside of the previous setTimeout  
    clearTimeout(timeout);
	
    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs node)
    timeout = setTimeout(later, wait);
	
    // Call immediately if you're dong a leading
    // end execution
    if (callNow) func.apply(context, args);
  };
};