 Gestion École

Ce projet est une application de gestion scolaire basée sur une architecture de microservices. Il comprend quatre microservices indépendants, une API Gateway, un serveur Eureka, et une interface frontale développée avec Angular.

  Structure du Projet

1. Microservices :
   - Étudiants : API RESTful pour gérer les données des étudiants (port : 8082).
   - Classes : API GraphQL pour gérer les classes (port : 8083).
   - Matières : Service SOAP pour gérer les matières (port : 8085).
   - Professeurs : Service développé avec Node.js et MongoDB pour gérer les professeurs (port : 8084).
2. API Gateway :
   - Centralise les appels vers les microservices (port : 8080).
3. Eureka Server :
   - Gère la découverte dynamique des services (port : 8761).
4. Front-End Angular :
   - Une interface utilisateur consommant les APIs exposées par l'API Gateway.

  Prérequis

- Java 17 ou supérieur
- Node.js version 16 ou supérieur
- Angular CLI
- Serveurs MySQL et MongoDB
- Maven ou Gradle

  Déploiement

     Bases de Données

- MySQL : Configurez une base de données pour les microservices suivants :
  - Étudiants : `etudiants_db`
  - Matières : `matieres_db`
  - Classes : `classes_db`
- MongoDB : Une base sera automatiquement créée pour le service professeurs.

   Microservices

1. Étudiants : 
   - Port : 8082  
   - Base de données : MySQL (`etudiants_db`).  
   - Endpoints :  
     - GET http://localhost:8082/api/etudiants : Récupérer la liste des étudiants.  
     - POST http://localhost:8082/api/etudiants : Ajouter un étudiant.  
     - PUT http://localhost:8082/api/etudiants/{id} : Modifier un étudiant.  
     - DELETE http://localhost:8082/api/etudiants/{id} : Supprimer un étudiant.

2. Classes :  
   - Port : 8083  
   - Base de données : MySQL (`classes_db`).  
   - Endpoint GraphQL :  
     - `http://localhost:8083/graphql` : Interface GraphiQL pour exécuter des requêtes.  
       Exemple de requête :  
       ```graphql
       query {
         classes {
           id
           nom
         }
       }
       ```

3. Matières :  
   - Port : 8085  
   - Base de données : MySQL (`matieres_db`).  
   - Endpoint SOAP :  
     - WSDL : `http://localhost:8085/ws/matieres.wsdl`.  
       Exemple de requête SOAP :  
       ```xml
       <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mat="http://example.com/matieres">
         <soapenv:Header/>
         <soapenv:Body>
           <mat:getMatiereRequest>
             <mat:id>1</mat:id>
           </mat:getMatiereRequest>
         </soapenv:Body>
       </soapenv:Envelope>
       ```

4. Professeurs :  
   - Port : 8084  
   - Base de données : MongoDB.  
   - Endpoints :  
     - `GET http://localhost:8084/api/profs` : Récupérer la liste des professeurs.  
     - `POST http://localhost:8084/api/profs` : Ajouter un professeur.  
     - `PUT http://localhost:8084/api/profs/{id}` : Modifier un professeur.  
     - `DELETE http://localhost:8084/api/profs/{id}` : Supprimer un professeur.

   API Gateway

- Port : 8080  
- Routes configurées pour rediriger les appels vers les microservices :  
  - Étudiants : `http://localhost:8080/api/etudiants`  
  - Professeurs : `http://localhost:8080/professeurs/api/profs`  
  - Matières : `http://localhost:8080/api/matieres` (exemple SOAP).  
  - Classes : `http://localhost:8080/graphql`  

   Eureka Server

- Port : 8761  
- URL : `http://localhost:8761`  
  - Interface pour visualiser les microservices enregistrés.

    Front-End Angular

1. Configurez les fichiers de services Angular pour pointer vers l'API Gateway (`http://localhost:8080`).  
2. Lancez l'application Angular avec `ng serve`.  
3. Accédez à l'interface utilisateur sur `http://localhost:4200`.

   Points Clés

- Chaque microservice est indépendant et doit être configuré avant de lancer l'API Gateway.
- L'API Gateway est le point d'entrée unique pour l'application.
- Utilisez Postman pour tester les endpoints REST, GraphQL et SOAP en fonction des exemples fournis.
