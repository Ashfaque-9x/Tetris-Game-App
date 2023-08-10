# Deploy-Tetris-Game-to-Azure-App-Service-using-Azure-Pipelines

Prerequisites :
- An Azure account with an active subscription. <a href="https://azure.microsoft.com/en-us/free/?WT.mc_id=A261C142F" target="_blank">Create an account for free.</a> 
- An Azure DevOps organization. <a href="https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/pipelines-sign-up?view=azure-devops" target="_blank">Create an account for free.</a> 

# Project Task and Steps:
1- Create a Azure Container Registry >>> <a href="https://github.com/hkaanturgut/azure-devops-apps/tree/main/terraspace%20codes/app/stacks/acr" target="_blank">ACR Terraspace Codes</a> 

![Screenshot 2023-02-05 at 8 52 24 AM](https://user-images.githubusercontent.com/113396342/217688610-006dc446-8ecf-4a3d-b15f-f154b2cf40b5.png)

#

2- Create a Azure DevOps Project 

![Screenshot 2023-02-08 at 9 02 10 PM](https://user-images.githubusercontent.com/113396342/217697901-7371faa5-284e-432c-8173-cc3083a4102a.png)

#

3- Create new service connection to make a connection between ACR-AzureDevOps and Github-AzureDevOps
   
   - Project Settings > Service Connections > Create service connection 

![Screenshot 2023-02-07 at 10 16 45 AM](https://user-images.githubusercontent.com/113396342/217698091-e8d36ac8-954b-4ea1-8967-0e3ac7e1c916.png)

![Screenshot 2023-02-05 at 8 58 37 AM](https://user-images.githubusercontent.com/113396342/217633906-991d0dc1-4bd3-4c3b-8d25-0ad1460d7c16.png)

#

4- Create a new Pipeline 

![Screenshot 2023-02-07 at 10 06 41 AM](https://user-images.githubusercontent.com/113396342/217698276-3d6e0ae1-be89-40b3-a99d-b83a82e271fb.png)

#

5-  Walk through the steps of the wizard by first selecting GitHub as the location of your source code. 

![Screenshot 2023-02-07 at 10 06 48 AM](https://user-images.githubusercontent.com/113396342/217698350-0bc21832-17f0-4985-8518-971a69181a0f.png)

#
6- When the list of repositories appears, select your repository. 

![Screenshot 2023-02-07 at 10 06 56 AM](https://user-images.githubusercontent.com/113396342/217698481-a0c0fbdf-8657-4cb2-9209-f8bd132bcdb7.png)

#

7- When the Configure tab appears, select Docker build and push an image to ACR.

![Screenshot 2023-02-07 at 10 07 12 AM](https://user-images.githubusercontent.com/113396342/217698605-63914cba-6e70-428d-89f4-c4c0252cd8bb.png)
#

8- Pipeline has been created 

![Screenshot 2023-02-07 at 10 09 14 AM](https://user-images.githubusercontent.com/113396342/217698744-de494fe8-dca7-43ff-9bf7-0393bbbc116b.png)
#


9- Build and Push job has been done.

![Screenshot 2023-02-08 at 9 09 53 PM](https://user-images.githubusercontent.com/113396342/217698953-10e72bed-3d7e-4332-b48f-6d3bb5f4086c.png)

    - Image has been deployed to ACR

![Screenshot 2023-02-07 at 10 12 51 AM](https://user-images.githubusercontent.com/113396342/217699093-2832144c-4b11-4820-9e71-69928933fbf2.png)

#

# RELEASE TO AZURE WEB APPS

- Create a Azure Linux Web App for Containers >>> <a href="https://github.com/hkaanturgut/azure-devops-apps/tree/main/terraspace%20codes/app/stacks/angular-app_linux_webapp" target="_blank">App Service Terraspace Codes</a> 

![Screenshot 2023-02-07 at 10 27 59 AM](https://user-images.githubusercontent.com/113396342/217699326-6102f8f5-31eb-48d3-8064-1b843a44de0b.png)
#

1- Create a Release Pipeline from the Release tab of the Pipeline

![Screenshot 2023-02-07 at 10 13 00 AM](https://user-images.githubusercontent.com/113396342/217699430-36baeccd-3727-43b3-9f63-36a8274a0817.png)

#

2- Select Azure App Service deployment

![Screenshot 2023-02-05 at 9 24 59 AM](https://user-images.githubusercontent.com/113396342/217689291-709b0b52-0965-41c0-ac6c-86b159c9e55b.png)
#

3- Add the artifact 

![Screenshot 2023-02-07 at 10 28 33 AM](https://user-images.githubusercontent.com/113396342/217699690-cb696122-85d2-4521-9020-489e584956b4.png)


    - Do not forget to enable continuous deployment trigger
    
![Screenshot 2023-02-05 at 9 25 47 AM](https://user-images.githubusercontent.com/113396342/217689586-f4efccc5-27da-4f75-8984-acd315764d98.png)  
#

4- Make the configurations of the stage 
   
    - Save and click on Create release
    
![Screenshot 2023-02-07 at 10 29 20 AM](https://user-images.githubusercontent.com/113396342/217700018-b595fa64-5747-4e28-bb62-49dac5abf7bb.png)


![Screenshot 2023-02-05 at 9 28 28 AM](https://user-images.githubusercontent.com/113396342/217693477-c924c69f-3152-43ac-8562-1cfd4a5d6be0.png)
#

- Release pipeline is succesfull

![Screenshot 2023-02-08 at 9 18 17 PM](https://user-images.githubusercontent.com/113396342/217700193-2b0216cc-f831-4a3f-af2f-b1f2b3741e89.png)

#

- Logs of the stage can be viewed from logs tab

![Screenshot 2023-02-07 at 10 33 06 AM](https://user-images.githubusercontent.com/113396342/217700238-d49a4047-b27a-494d-96e2-2fd9794d9091.png)

#


## Add the website expose port from the Azure Portal otherwise website will not work
   
   App Service > Configuration > Application Settings > New application setting > 
   
   ![Screenshot 2023-02-09 at 7 01 45 PM](https://user-images.githubusercontent.com/113396342/218096900-4851e758-d2a7-4c03-a361-480c5a02e254.png)

   Add the exposing port that is on the Dockerfile ( this port is just for example )
   
   ![Screenshot 2023-02-09 at 7 02 06 PM](https://user-images.githubusercontent.com/113396342/218097051-68ad3708-9d14-49b8-8815-70d20ec1cd76.png)
#

# Here is the working website throug Azure Web App

![Screenshot 2023-02-07 at 10 32 55 AM](https://user-images.githubusercontent.com/113396342/217700272-a348ff0a-42ee-43a5-81d0-9c5ccdc83c32.png)
#

# TROUBLESHOOTING

- If you are getting this port error , make sure you add the website port setting > <a href="https://github.com/hkaanturgut/DEPLOY-5-WEBAPPS-TO-AZURE-APP-SERVICE-USING-AZURE-DEVOPS-PIPELINES#add-the-website-expose-port-from-the-azure-portal-otherwise-website-will-not-work" target="_blank">Solution</a> 

![Screenshot 2023-02-09 at 7 08 23 PM](https://user-images.githubusercontent.com/113396342/218098268-eeb103b1-55e9-4e9d-973b-689b2b53ddab.png)

