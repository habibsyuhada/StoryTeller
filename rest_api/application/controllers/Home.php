<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index(){
		$data['subview'] 			= 'home/index';
		$data['menu_active'] 	= 'home';
		$data['meta_title'] 	= 'Home';
		$this->load->view('index', $data);
	}

	public function hostname(){
		echo $_SERVER['HTTP_HOST'].'<br>';
		echo base_url();
	}

	public function training(){
		$data['subview'] 			= 'home/training';
		$data['menu_active'] 	= 'training';
		$data['meta_title'] 	= 'Training';
		$this->load->view('index', $data);
	}

	public function register(){
		$data['subview'] 			= 'home/register';
		$data['menu_active'] 	= 'register';
		$data['meta_title'] 	= 'Daftar';
		$this->load->view('index', $data);
	}

	public function career(){
		$data['subview'] 			= 'home/career';
		$data['menu_active'] 	= 'career';
		$data['meta_title'] 	= 'Karir';
		$this->load->view('index', $data);
	}

	public function contact(){
		$data['subview'] 			= 'home/contact';
		$data['menu_active'] 	= 'contact';
		$data['meta_title'] 	= 'Kontak';
		$this->load->view('index', $data);
	}
}
