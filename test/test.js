require("chromedriver");
const {By,Key,Builder} = require("selenium-webdriver");
async function example(){
 
    var searchString = "Automation testing with Selenium and JavaScript";

    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

     //To fetch http://google.com from the browser with our code.
     await driver.get("http://localhost:3000/");
         
     //To send a search query by passing the value in searchString.
     await driver.findElement(By.id("firstname")).sendKeys("Shrivyy",Key.RETURN);
     await driver.findElement(By.id("lastname")).sendKeys("Shetty",Key.RETURN);
     await driver.findElement(By.id("username")).sendKeys("ShrivyaShetty@gmail.com",Key.RETURN);
     await driver.sleep(1000);
     
     await driver.findElement(By.id("outlined-adornment-password")).sendKeys("Shri7889$%%",Key.RETURN);
     
     await driver.findElement(By.id(" outlined-adornment-confirm-password")).sendKeys("Shri7889$%%",Key.RETURN);
    
     await driver.findElement(By.id("next-buttonp")).click();
    await driver.sleep(1000);
     //Verify the page title and print it
    //  var title = await driver.getTitle();
    //  console.log('Title is:',title);
    var url = driver.getCurrentUrl();
    console.log(url);
    //  Thread.sleep(3000);
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}
example()