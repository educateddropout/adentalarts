<?php

require 'database/ConnectionLogin.php';
require 'database/QueryBuilder.php';

return new QueryBuilder(Connection::make());




?>