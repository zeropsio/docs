# Introduction

Zerops is a cloud **platform-as-a-service** (PaaS) made [by developers for developers](/documentation/overview/made-for-developers.html). All of Zerops' services, whether it's a [runtime](/documentation/services/runtimes.html), [static server](/documentation/services/static-server.html), [database](/documentation/services/databases.html) or [storage](/documentation/services/storage.html), are HA ([high availability](/documentation/ha/why-should-i-want-high-availability.html)) enabled by default and [automatically scaled](/documentation/automatic-scaling/how-automatic-scaling-works.html) and **optimized** to always run in the [most efficient and reliable setting](/documentation/ha/zerops-enterprise-grade-reliability.html).

**Here are the main things Zerops aims to solve for you:**

### 1. Building, deploying, and runnning your applications or serving static files

A good build and deploy setup is hard, so we try to make it easy no matter your usecase. You can [connect your service with a GitHub repository](/documentation/github/github-integration.html) to automatically trigger a [build and deploy](/documentation/build/how-zerops-build-works.html) pipeline using the [`zerops.yml`](/documentation/build/build-config.html) build definition file.

Alternatively, you can use [Zerops CLI](/documentation/cli/installation-authorization.html) to manually trigger [deploy](/documentation/deploy/how-deploy-works.html) of your build artefacts, or `zcli push` cli [command](/documentation/cli/available-commands.html#push) to start the build and deploy pipeline. No matter if you do it locally from you terminal, from [GitHub Actions](/documentation/deploy/use-in-github-actions.html), [Gitlab CD/CI](/documentation/gitlab/gitlab-integration.html) or any other [CI service](/documentation/cli/available-commands.html#deploy).

Whether you need to serve a [JAMSTACK](https://jamstack.org/) app or run an environment, we have you covered. Serve a static Angular, Vue or react app from our [nginx server](/documentation/services/static-server.html), run multiple [Node.js](/documentation/services/runtimes.html#node-js), [Golang](/documentation/services/runtimes.html#golang) or [PHP](/documentation/services/runtimes.html#php) applications on Zerops [runtime services](/documentation/services/runtimes.html).


### 2. Fully managed databases

All databases Zerops manages are running on at least [three hardware separated nodes](/documentation/ha/why-should-i-want-high-availability.html) to ensure the highest possible [security and reliability](/documentation/ha/zerops-enterprise-grade-reliability.html) of you data. Each of [MariaDB (MySQL)](/documentation/services/databases.html#mariadb-mysql.html), [MongoDB](/documentation/services/databases.html#redis), [Redis](/documentation/services/databases.html#redis), [Elasticsearch](/documentation/services/databases.html#elasticsearch) is fine tuned to be as performant at any given [automatic scaling state](/documentation/automatic-scaling/how-automatic-scaling-works.html). Everything fully managed by Zerops with [backups](/documentation/backup-restore/snapshot-backup.html) in geologically different locations.


### 3. Taking care of internal and public routing

Each service is automatically set up to be able to [securely communicate](/documentation/routing/routing-between-project-services.html) with other services inside the same project using their hostnames and ports, i.e. your Golang app service (`myapp:3000`) can access a Mongo database service(`mydatabase:27017`) using `mongodb://mydatabase:27017` connection string. You can manage which ports are open inside the Zerops.io app.

If your application needs to be publicly accesible, Zerops can easily set up access from your [domains](/documentation/routing/using-your-domain.html), as well as direct access through a [unique IPv4 or IPv6 address](/documentation/routing/unique-ipv4-ipv6-addresses.html), with the ability to setup [firewall](/documentation/routing/access-through-ip-and-firewall.html) rules. Zerops also generates a [*.zerops.io subdomain](/documentation/routing/zerops-subdomain.html) if you just need to test things out.


### 4. Intelligent automatic scaling from zero to enterprise projects

Zerops is able to [scale, both horizontally and vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html), your services, whether it's a runtime, database or storage. A service can easilly go **from** `1x CPU`, `1 GB ram` on `3 containers` **to** `96x CPU`, `2 TB RAM` on `64 containers` and back down in matter of seconds, all scaling operations optimized for particular technology and its version.


### 5. Developer friendliness

We try not to get in your way. We know that for a good dev experience you might want a separate infrastructure for each environment (stage, prod), or even each developer, that's why Zerops has no limit for number of projects or team members. Each service starts free, you only start paying once your applications or databases need to scale up.

We also provide a number of tools to make dev life easier, once of which is the [VPN](/documentation/cli/vpn.html) capability of our CLI, so you can [locally connect](/documentation/cli/available-commands.html#start-project-name) to any of your running services by using its Zerops hostname and a port, i.e. visiting `http://myapp:3000` or `mongodb://mydatabse:27017` will work for you.
