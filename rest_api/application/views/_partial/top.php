<body>

	<!--================Header Menu Area =================-->
	<header class="header_area font-weight-bold wow fadeInDown">
		<div class="main_menu">
			<nav class="navbar navbar-expand-lg navbar-light">
				<div class="container">
					<!-- Brand and toggle get grouped for better mobile display -->
					<a class="navbar-brand" href="index.html"><img src="<?php echo base_url(); ?>assets/img/logo.png" alt=""> &nbsp; Smart Pro Training</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
					 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
						<ul class="nav navbar-nav menu_nav justify-content-end">
							<li class="nav-item <?php echo ($menu_active == 'home' ? 'active' : '') ?>"><a class="nav-link font-weight-bold" href="<?php echo base_url() ?>"><i class="fas fa-home"></i> &nbsp; Home</a></li>
							<li class="nav-item <?php echo ($menu_active == 'training' ? 'active' : '') ?>"><a class="nav-link font-weight-bold" href="<?php echo base_url() ?>training">Training</a></li>
							<li class="nav-item <?php echo ($menu_active == 'register' ? 'active' : '') ?>"><a class="nav-link font-weight-bold" href="<?php echo base_url() ?>register">Daftar</a></li>
							<li class="nav-item <?php echo ($menu_active == 'career' ? 'active' : '') ?>"><a class="nav-link font-weight-bold" href="<?php echo base_url() ?>career">Karir</a></li>
							<li class="nav-item <?php echo ($menu_active == 'contact' ? 'active' : '') ?>"><a class="nav-link font-weight-bold" href="<?php echo base_url() ?>contact">Contact</a></li>
							<!-- <li class="nav-item"><a class="nav-link" href="about-us.html">About</a></li> -->
							<!-- <li class="nav-item submenu dropdown">
								<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
								 aria-expanded="false">Blog</a>
								<ul class="dropdown-menu">
									<li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
									<li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a></li>
								</ul>
							</li> -->
						</ul>
					</div>
				</div>
			</nav>
		</div>
	</header>
	<!--================Header Menu Area =================-->