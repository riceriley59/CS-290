<!DOCTYPE html>
<html>
<head lang="en">
   <meta charset="utf-8">
   <title>Riley Rice</title>
   <link rel='stylesheet' type='text/css' media='screen' href='styles.css'>
</head>
<body>
    <header>
        <h1>Riley Rice</h1>
    </header>
    <nav>
        <a href="form.html"></a>
        <a href="contact.html"></a>
    </nav>
    <main>
        <section>

        </section>
    </main>
    <footer>
        <p>Copyright &copy; - 2023 Riley Rice</p>
    </footer>
	<?php 
		if (count($_GET) == 0)
			echo "<p><em>There are no GET variables</em></p>";
		foreach ($_GET as $key => $value) { 
			echo "<strong>" . $key . "=</strong>" . $value . "</br>";
		}
	?>
</body>
</html>