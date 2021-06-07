# Databases

## MariaDB (MySQL)

<!-- markdownlint-disable DOCSMD004 -->
::: details Compatibility & Differences to MySQL
Information on the compatibility of MariaDB software with similar, competing software, as well as their differences, can be found [here](https://mariadb.com/kb/en/compatibility-differences).
:::
<!-- markdownlint-enable DOCSMD004 -->

The following image shows a simplified schema of a standalone Zerops MariaDB Service in HA mode (with a default of 3 database instances in a cluster) without external access. This means no access from outside of Zerops project infrastructure, such as the Internet. There is only native access through a private network using a default port 3306 from the Zerops Project Basic Service itself, representing the core of a user-defined project inside Zerops.

![Zerops MariaDB Service](./images/Zerops-MariaDB-Service-Base.png "Zerops MariaDB Service")

Zerops Project Core Service is the heart of each Zerops project. It has its own [pricing logic](/documentation/overview/pricing.html#projects). The essential parts are two running instances of a **project balancer** (one in an active state and the other in a standby backup state) through which all communication is passing (either related to the project's external environment or the private network). This ensures a high degree of reliability and stability for all traffic at any time. Each of them runs in a different container located on a **different physical machine**. An independent **activity controller** continuously monitors critical operating parameters of both project balancers. If the currently active instance shows any abnormalities, the running standby backup gets activated instead. From an external perspective, this change is not noticeable in any way.

Zerops MariaDB Service shares the [same pricing structure](/documentation/overview/pricing.html#services) with other Zerops services. Once again, two instances of a **[load balancer (MaxScale)](https://mariadb.com/kb/en/maxscale)** (both in the active state) play a crucial role and control the routing of data reading requests in tandem. They always direct the requests to the least busy instance of the MariaDB database service (or to the primary one in case of data writing requests). An independent **scaling controller** monitors and controls [vertical scaling](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (vCPU, RAM, Disk) for all load balancer and MariaDB database containers. To ensure optimal performance, the MariaDB cluster is always configured and run with 3 database instances, and [horizontal scaling](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) (number of containers) doesn't play any role in this case. An independent **repair controller** is then responsible for removing any containers that exhibit abnormal behavior and subsequently replacing them with new ones.

Both load balancers or MariaDB service containers are located on **different physical computers** to prevent service outages in the event of any fatal failure on a single physical computer.

Below, you can see the same schema as before, this time including all relations among internal parts. You can also see details regarding project core controllers. The **statistics one** is used for storing metrics of operational parameters of all project and service containers, and the **logger one** for recording all events. The legend can help you orient yourself.

![Zerops MariaDB Service](./images/Zerops-MariaDB-Service-Detail.png "Zerops MariaDB Service")

<!-- markdownlint-disable DOCSMD004 -->
::: details Primary & Replica MariaDB instances
There is always only one primary instance with write access. This is to minimize the risk of data drift and errant transactions. If the primary instance has failed for any reason, the replication mechanism will activate a new one using one of the available replica instances.
:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable DOCSMD004 -->
::: warning Volatile non-database storage
Each container has a separate disk space, which can theoretically be used by appropriate APIs of the database service and thus store data outside the replicated contents of the database. It should be noted that such data is considered volatile (reserved for this particular instance only). It will not be migrated if such a container is deleted due to a failure of this container. If it is necessary to store and share such data at the database level permanently, developers should use Zerops object storage or shared storage services. Also, separate direct access to an individual MariaDB instance is not supported in any way.
:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable DOCSMD004 -->
::: tip Asynchronous behavior of MariaDB HA cluster
When data is stored in a MariaDB cluster (through its actual primary database instance), it is replicated across other replica instances asynchronously. This means that if one SQL statement stores some data, the next immediate statement may not retrieve the same data. The reason is that the given statement will be executed against another replica instance. If required to get the same data, it's necessary to encapsulate both commands into one SQL transaction, which will always be executed against the primary instance.
:::
<!-- markdownlint-enable DOCSMD004 -->

## MongoDB

## Redis

## Elasticsearch

## RabbitMQ
