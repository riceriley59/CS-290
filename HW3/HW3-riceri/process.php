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
        <a href="form.html">Contact Form</a>
        <a href="contact.html">Contact</a>
    </nav>
    <main>
        <section>
        <?php 
            if (count($_GET) == 0)
                echo "<p><em>You didn't enter any data</em></p>";
            foreach ($_GET as $key => $value) { 
                echo "<strong>" . $key . "=</strong>" . $value . "</br>";
                echo "<p>Your information was Sent!!";
            }
	    ?>
        </section>
    </main>
    <footer>
        <p>Copyright &copy; - 2023 Riley Rice</p>
    </footer>
</body>
</html>