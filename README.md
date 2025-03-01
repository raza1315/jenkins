Install openjdk 
Now install jenkins 
brew instal jenkins-lts
now start the jenkins service 
brew services start jenkins-lts
open jenkins dashboard at localhost:8080 and type the password (will find the initial pass here cat /Users/$(whoami)/.jenkins/secrets/initialAdminPassword)
now setup admin id pass and install the plugins 

create Jenkinsfile 

expose the localhost:8080 to internet using ngrok/cloudflared (For githubwebhook purpose)

go to github repo (settings->webhooks) add the url ending with /github-webhook (send everything check)

Since in Mac jenkins is not a user unlike linux its a service so for jenkins to access docker/docker-compose go to jenkins dashboard and go to jenkins 
Open Jenkins Dashboard → Manage Jenkins → Manage Nodes and Clouds
Click Built-In Node → Configure
Find Node Properties → Enable "Environment Variables"
Add:
Name: PATH
Value: /usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin
Save & restart Jenkins:
brew services restart jenkins-lts

now restart jenkins 
brew services restart jenkins-lts

now create a job and check trigger github scm and enter the repo url and branch name 



