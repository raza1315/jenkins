# Jenkins CI/CD Pipeline with Docker on macOS

## Prerequisites
Ensure you have the following installed on your macOS:
- Homebrew (`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`)
- OpenJDK (`brew install openjdk`)
- Docker & Docker Compose (`brew install --cask docker` and then open Docker app)
- ngrok or Cloudflared for exposing local Jenkins to the internet

## Installation Steps

### 1. Install and Start Jenkins
```sh
brew install jenkins-lts
brew services start jenkins-lts
```

### 2. Access Jenkins Dashboard
Open your browser and go to:
```
http://localhost:8080
```
Retrieve the initial admin password:
```sh
cat /Users/$(whoami)/.jenkins/secrets/initialAdminPassword
```
Set up your admin credentials and install recommended plugins.

### 3. Configure Jenkins to Use Docker
Since Jenkins runs as a **service** (not a user) on macOS, update its environment variables:
1. **Go to Jenkins Dashboard** → Manage Jenkins → Manage Nodes and Clouds
2. Click **Built-In Node** → Configure
3. Enable **"Environment Variables"** under Node Properties
4. Add the following:
   - **Name:** `PATH`
   - **Value:** `/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin`
5. Save and restart Jenkins:
```sh
brew services restart jenkins-lts
```

### 4. Set Up GitHub Webhook
1. **Expose Jenkins to the Internet**
   - Using ngrok: `ngrok http 8080`
   - Using Cloudflared: `cloudflared tunnel --url http://localhost:8080`
2. **Copy the public URL** and add it to GitHub webhook settings:
   - Go to your GitHub repository → Settings → Webhooks
   - Add webhook URL: `<your-ngrok-url>/github-webhook/`
   - Choose "Send everything" and save.

### 5. Create a Jenkins Pipeline
#### **Jenkinsfile Example**
```groovy
pipeline {
    agent any

    stages {
        stage("Clone Code") {
            steps {
                echo "Started Cloning Code from GitHub"
		git url: "https://github.com/raza1315/jenkins.git" , branch: "main"
            }
        }
        stage("Deploy") {
            steps {
                echo "Running Docker Compose to Start Container"
		sh "docker compose down"
		sh "docker-compose up -d --build"
            }
        }
    }

    post {
        success {
            echo 'Server deployed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

```

### 6. Create a Jenkins Job
1. Go to Jenkins Dashboard → **New Item**
2. Select **Pipeline** and enter a job name
3. Under **Pipeline Definition**, select "Pipeline script from SCM"
4. Enter your GitHub repo URL and branch name
5. Enable "GitHub hook trigger for GITScm polling"
6. Save and **Build Now**

### 7. Verify Deployment
Check running containers:
```sh
docker ps
```
View logs if needed:
```sh
docker-compose logs -f
```
Your app should now be running and automatically redeployed on GitHub pushes!

