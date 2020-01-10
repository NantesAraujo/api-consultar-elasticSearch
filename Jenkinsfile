pipeline {
    agent {
        docker {
            image 'repo.ms.gov.br/sgi/devops/jenkins/agent:node11.3.0-alpine3.8'
            registryUrl 'https://repo.ms.gov.br'
            registryCredentialsId 'docker-deployer'
            args '-v /swarm/maven/repository:/usr/share/maven/ref/repository -v /var/run/docker.sock:/var/run/docker.sock -v /swarm/jenkins/.dockercfg:/root/.dockercfg'
        }
    }

    environment {
        VERSION = 'v1'
        APP_JSON = ''
        APP_NAME = ''
        APP_VERSION = ''
        STACK_NAME = ''
        IMAGE = ''
        IMAGE_TAG = ''
        NEXT_VERSION = ''
        NUMBER_REPLICAS = ''
        REGION = ''
        RELEASE_BRANCH = "${GIT_BRANCH}".replace("origin/", "")
        SERVICE_DOMAIN = ''
        SERVICE_NAME = ''
        STAGE_FAILURE = 'NONE'
        REGISTRY = "repo.ms.gov.br/sgi/csis/g14"
        SID = "d0490"
        BRANCH_NAME = "${GIT_BRANCH}".replace("origin/", "")
    }
    stages {
        stage('Prepare') {
            steps {
                script {
                    REGION = "${env.JOB_NAME}".split('\\.')[1].toLowerCase()
                    switch(REGION) {
                    case 'prd':
                        SERVICE_DOMAIN = 'api.sgi.ms.gov.br'
                        NUMBER_REPLICAS = "2"
                        break
                    case 'hom':
                        SERVICE_DOMAIN = 'hom.api.sgi.ms.gov.br'
                        NUMBER_REPLICAS = "1"
                        break
                    case 'dev':
                        SERVICE_DOMAIN = 'des.api.sgi.ms.gov.br'
                        NUMBER_REPLICAS = "1"
                        break
                    }

                    echo 'setting variables'
                    APP_JSON = readJSON file: 'package.json';
                    String[] str = APP_JSON.version.split("\\.")
                    versao = Integer.parseInt(str[2]) + 1
                    APP_VERSION = str[0] + '.' + str[1] + '.' + versao
                    APP_NAME =  APP_JSON.name

                    IMAGE = "${SID}.${REGION}.${APP_NAME}:${APP_VERSION}"
                    IMAGE_TAG = "${REGISTRY}/${IMAGE}"

                    SERVICE_NAME = "${SID}-${REGION}-${APP_NAME}"
                    STACK_NAME = "${SID}-${REGION}-docker-stack-${APP_NAME}.yml"
                }

                echo 'git config'
                withCredentials([usernamePassword(credentialsId: '14984827-9d34-429a-af22-a33cc40b01e9', passwordVariable: 'GIT_PASS', usernameVariable: 'GIT_USER')]) {
                    sh 'echo http://"${GIT_USER}":"${GIT_PASS}"@tfs.sgi.ms.gov.br > $HOME/.git-credentials'
                    sh 'git config --global user.email "${GIT_USER}@fazenda.ms.gov.br"'
                    sh 'git config --global user.name "${GIT_USER}"'
                    sh 'git config --global credential.username "${GIT_USER}"'
                    sh "git config --global credential.helper 'store --file $HOME/.git-credentials'"
                    sh "git fetch --all --tag --force"
                    sh 'git checkout ${BRANCH_NAME}'
                }
            }
        }

        stage('Build Image') {
            options {
                retry(3)
            }
            when {
                environment name: "STAGE_FAILURE", value: "NONE"
            }
            steps {
                script {
                    echo 'replace All DockerFile'
                    def dockerfile = readFile 'Dockerfile'
                    
                    dockerfile = dockerfile.replaceAll("<ambiente>", "${REGION}")
                    
                    writeFile file: "Dockerfile", text: dockerfile

                    echo dockerfile
                }
                
                sh "cd ${WORKSPACE} && docker build -t ${IMAGE} ."
            }
            post {
                failure {
                    script {
                        STAGE_FAILURE = 'BUILD_IMAGE'
                    }
                }
            }
        }

        stage('Tag Image') {
            when {
                environment name: "STAGE_FAILURE", value: "NONE"
            }
            steps {
                sh "docker tag ${IMAGE} ${IMAGE_TAG}"
            }
            post {
                failure {
                    script {
                        STAGE_FAILURE = 'TAG_IMAGE'
                    }
                }
            }
        }

        stage('Push Image') {
            options {
                retry(3)
            }
            when {
                environment name: "STAGE_FAILURE", value: "NONE"
            }
            steps {
                sh "docker push ${IMAGE_TAG}"
            }
            post {
                failure {
                    script {
                        STAGE_FAILURE = 'PUSH_IMAGE'
                    }
                }
            }
        }

        stage('Create Stack') {
            when {
                environment name: "STAGE_FAILURE", value: "NONE"
            }
            steps {
                script {
                    echo 'create stack deployment.yml'
                    yml = readFile 'deployment.yml'
                    yml = yml.replaceAll("<app.name>", "${APP_NAME}")
                    yml = yml.replaceAll("<app.version>", "${APP_VERSION}")
                    yml = yml.replaceAll("<image>", "${IMAGE}")
                    yml = yml.replaceAll("<number.replicas>", "${NUMBER_REPLICAS}")
                    yml = yml.replaceAll("<region>", "${REGION}")
                    yml = yml.replaceAll("<registry>", "${REGISTRY}")
                    yml = yml.replaceAll("<sid.env>", "${SID}".toUpperCase())
                    yml = yml.replaceAll("<sid>", "${SID}")
                    yml = yml.replaceAll("<version>", "${VERSION}")
                    yml = yml.replaceAll("<image.tag>", "${IMAGE_TAG}")
                    yml = yml.replaceAll("<service.domain>", "${SERVICE_DOMAIN}")
                    writeFile file: "${WORKSPACE}/${STACK_NAME}", text: yml

                    echo yml
                }
            }
            post {
                failure {
                    script {
                        STAGE_FAILURE = 'CREATE_STACK'
                    }
                }
            }
        }

        stage('Deploy') {
            options {
                retry(3)
            }
            when {
                environment name: "STAGE_FAILURE", value: "NONE"
            }
            steps {
                sh "swarm-deploy ${SERVICE_NAME} ${STACK_NAME}"
            }
            post {
                failure {
                    script {
                        STAGE_FAILURE = 'DEPLOY'
                    }
                }
            }
        }

        stage('Pos Deploy') {
            options {
                retry(3)
            }
            when {
                environment name: "STAGE_FAILURE", value: "NONE"
            }
            steps {

                script {
                  APP_JSON.version = APP_VERSION
                  writeJSON file: 'package.json', json: APP_JSON, pretty: 4
                  result = readJSON file: 'package.json';
                  print result
                }

                sh "git add ."
                sh "git commit -a -m 'deploy ${IMAGE_TAG}'"
                sh "git push origin ${RELEASE_BRANCH}"
                sh "git tag ${APP_NAME}-${APP_VERSION}-${REGION}"
                sh "git push origin ${APP_NAME}-${APP_VERSION}-${REGION}"
            }
            post {
                failure {
                    script {
                        STAGE_FAILURE = 'DEPLOY'
                    }
                }
            }
        }

    }

    post {
        always {
            echo 'remove workspace'
            deleteDir()
        }
        failure {
            echo "Failure ${STAGE_FAILURE}"
            script {
                switch("${STAGE_FAILURE}") {
                case 'MAVEN_PREPARE':
                    break
                case 'MAVEN_PERFORM':
                case 'GET_ARTIFACTS':
                    deleteGitTag()
                    break
                case 'BUILD_IMAGE':
                    deleteGitTag()
                    reverseRelease()
                    break
                case 'TAG_IMAGE':
                case 'PUSH_IMAGE':
                case 'CREATE_STACK':
                case 'DEPLOY':
                    deleteImage()
                    deleteGitTag()
                    reverseRelease()
                    break
                }
            }
        }
    }
}



void deleteGitTag() {
    echo 'deleteGitTag'
    sh "git tag -d ${APP_NAME}-${APP_VERSION}-${REGION}"
    sh "git push origin :refs/tags/${APP_NAME}-${APP_VERSION}-${REGION}"
}

void deleteImage() {
    echo 'deleteImage'
    sh "docker rmi ${IMAGE_TAG} -f"
    sh "docker rmi ${IMAGE} -f"
}