pipeline {
    agent any

	triggers {
        githubPush() // Trigger the pipeline when a push event occurs
    }
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker')
        FRONTEND_IMAGE = 'vaibhavnitor/frontend-1'
        BACKEND_IMAGE = 'vaibhavnitor/backend-1'
        // GKE Cluster Details
        GKE_CLUSTER_NAME = 'my-first-cluster-1'
        GKE_ZONE = 'us-central1-c'
        GKE_PROJECT = 'my-project-dotnet-445205'
		

    }

    stages {
        stage('Checkout from Git'){
            steps{
                git branch: 'frontend', url: 'https://github.com/VaibhavchavanDevOps/Three-tier-angular-dotnet-sql-application-23-testing.git'
            }
		}

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    //Replace 'frontend' with the path to the frontend Dockerfile
                    sh 'docker  build -t ${FRONTEND_IMAGE}:latest  ElectronicEquipmentAngular'
                }
            }
        }
		//stage("TRIVY"){
          //  steps{
            //    sh "trivy image ${FRONTEND_IMAGE}:latest "
			//	sh "trivy image ${BACKEND_IMAGE}:latest "
			//	sh "trivy image ${DATABASE_IMAGE}:latest "
            //}
        //}
        stage('Push Images to Docker Hub') {
            steps {
              script {
                withCredentials([usernamePassword(credentialsId: 'docker', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {          sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
 
                // Push the Docker images
                sh 'docker push ${FRONTEND_IMAGE}:latest'
                     }
                    }
		        }
        }
        stage('Deploy backend to  GKE') {
            steps {
                script {
                    // Authenticate with GKE
                    withCredentials([file(credentialsId: 'gke-credentials', variable: 'GKE_CREDENTIALS')]) {
                        // Authenticate with GCloud
                        sh '''
                            gcloud auth activate-service-account --key-file=${GKE_CREDENTIALS}
                            gcloud config set project ${GKE_PROJECT}
                            gcloud container clusters get-credentials ${GKE_CLUSTER_NAME} --zone ${GKE_ZONE}
                        '''
                        
                        // Deploy to GKE
                        sh '''
                            kubectl apply -f manifest/frontend.yaml
                            kubectl apply -f manifest/frontend-service.yaml
                            
                        '''
                        
                        // Verify deployments
                        sh '''
                            kubectl get deployments
                            kubectl get services
                            kubectl get pods
                        '''
						
					}
				}
			}
        }  
    }
}
