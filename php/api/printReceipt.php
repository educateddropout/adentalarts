<?php
	
	$database = require '..\bootstrap.php';
	session_start();
	// setting return value
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$data = json_decode(file_get_contents("php://input"), true);

	
	$results = $database->fetchParticularsPerJobOrder($data['data']['job_order_id']);
	
	printReceipt($data['data'],$results);


	function printReceipt($data, $particulars){
		$dateStr = date_format(date_create($data["date_added"]),"F d, Y");

		require("../lib/fpdf/fpdf.php");

		$f = new NumberFormatter("en", NumberFormatter::SPELLOUT);

		class PDF extends FPDF
		{

			//Cell with horizontal scaling if text is too wide
		    function CellFit($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='', $scale=false, $force=true)
		    {
		        //Get string width
		        $str_width=$this->GetStringWidth($txt);

		        //Calculate ratio to fit cell
		        if($w==0)
		            $w = $this->w-$this->rMargin-$this->x;
		        $ratio = ($w-$this->cMargin*2)/$str_width;

		        $fit = ($ratio < 1 || ($ratio > 1 && $force));
		        if ($fit)
		        {
		            if ($scale)
		            {
		                //Calculate horizontal scaling
		                $horiz_scale=$ratio*100.0;
		                //Set horizontal scaling
		                $this->_out(sprintf('BT %.2F Tz ET',$horiz_scale));
		            }
		            else
		            {
		                //Calculate character spacing in points
		                $char_space=($w-$this->cMargin*2-$str_width)/max($this->MBGetStringLength($txt)-1,1)*$this->k;
		                //Set character spacing
		                $this->_out(sprintf('BT %.2F Tc ET',$char_space));
		            }
		            //Override user alignment (since text will fill up cell)
		            $align='';
		        }

		        //Pass on to Cell method
		        $this->Cell($w,$h,$txt,$border,$ln,$align,$fill,$link);

		        //Reset character spacing/horizontal scaling
		        if ($fit)
		            $this->_out('BT '.($scale ? '100 Tz' : '0 Tc').' ET');
		    }

		    //Cell with horizontal scaling only if necessary
		    function CellFitScale($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='')
		    {
		        $this->CellFit($w,$h,$txt,$border,$ln,$align,$fill,$link,true,false);
		    }

			// Page header
			function Header()
			{
			    // Logo
			    //$ampongDentalLogo = "images/ad_horizontal.jpg";
			    //$this->Image($ampongDentalLogo,90,6,40);
			    // Arial bold 15
			    if (!$this->skipHeader) {
			            // ...
			        
				    $this->SetFont('Arial','B',15);
				    // Move to the right
				    $this->Cell(80);
				    // Title
				    $this->Cell(30,10,'AMPONG DENTAL CLINIC',0,0,'C');
				    // Line break
				    $this->Ln(20);
			    }
			}

			// Page footer
			function Footer()
			{
				if (!$this->skipFooter) {
				    // Position at 1.5 cm from bottom
				    $this->SetY(-15);
				    // Arial italic 8
				    $this->SetFont('Arial','I',8);
				    // Page number
				    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
				}
			}
		}

		// Instanciation of inherited class
		$pdf = new PDF("P", "mm", array(210 , 148.5 ));
		$pdf->AliasNbPages();
		$pdf->skipHeader = true;
		$pdf->skipFooter = true;
		$pdf->AddPage();
		$pdf->SetFont('Times','',10);

		$yAxis = 13;
		$xAxis = 15;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFont('Times','B',12);
		$pdf->Cell(180,3,"AMPONG DENTAL CLINIC",0, 2, 'C');
		$pdf->SetFont('Times','',8);
		$pdf->Cell(180,3,"2F Kamuning Place, Kamuning Road,",0, 2, 'C');
		$pdf->Cell(180,3,"Quezon City, Philippines",0, 2, 'C');
		$pdf->Cell(180,3,"Phone: (02) 8281-5482",0, 2, 'C');
		$pdf->Cell(180,3,"Cellphone: (63) 9178835013",0, 2, 'C');

		$yAxis = 35;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFont('Times','',12);
		$pdf->Cell(20,4,"CLIENT:",0, 0, 'L');
		$pdf->Cell(60,4,$data["client_name"],0, 0, 'L');

		$yAxis = $yAxis+6;

		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->Cell(100,4,$dateStr,0, 0, 'L');
		$pdf->Cell(45,4,"Job Requisition ID:",0, 0, 'L');
		$pdf->Cell(35,4,$data["job_order_id"],0, 0, 'L');

		$yAxis = $yAxis+6;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);

		$pdf->SetFont('Times','B',10);
		$pdf->CellFitScale(20,6,"QUANTITY",0, 0, 'C');
		$pdf->CellFitScale(15,6,"UNIT",0, 0, 'C');
		$pdf->CellFitScale(100,6,"",0, 0, 'C');
		$pdf->CellFitScale(20,6,"UNIT",0, 0, 'C');
		$pdf->CellFitScale(25,6,"AMOUNT",0, 0, 'C');
		$yAxis = $yAxis+6;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->CellFitScale(20,6,"",0, 0, 'C');
		$pdf->CellFitScale(15,6,"",0, 0, 'C');
		$pdf->CellFitScale(100,6,"",0, 0, 'C');
		$pdf->CellFitScale(20,6,"PRICE",0, 0, 'C');
		$pdf->CellFitScale(25,6,"",0, 0, 'C');

		$pdf->SetY($yAxis-6);
		$pdf->SetX($xAxis);
		$pdf->CellFitScale(20,12,"",1, 0, 'C');
		$pdf->CellFitScale(15,12,"",1, 0, 'C');
		$pdf->CellFitScale(100,12,"",1, 0, 'C');
		$pdf->CellFitScale(20,12,"",1, 0, 'C');
		$pdf->CellFitScale(25,12,"",1, 0, 'C');

		$pCtr = 0;
		$pLength = count($particulars);

		$yAxisBeforeBox = $yAxis;

		for ($i=0; $i < 10; $i++) { 
			$yAxis = $yAxis+6;
			$pdf->SetY($yAxis);
			$pdf->SetX($xAxis);

			$pdf->Cell(20,6,"",1, 0, 'L');
			$pdf->Cell(15,6,"",1, 0, 'L');
			$pdf->Cell(100,6,"",1, 0, 'L');
			$pdf->Cell(20,6,"",1, 0, 'L');
			$pdf->Cell(25,6,"",1, 0, 'L');

			

		}

		$y = $yAxisBeforeBox+6;
		$pdf->SetFont('Times','',11);
		$totalAmount = 0;
		foreach ($particulars as $p) {
			$y = $y+6;
			$pdf->SetY($y);
			$pdf->SetX($xAxis);
			$pdf->CellFitScale(20,6,$p["quantity"],1, 0, 'C');
			$pdf->CellFitScale(15,6,"",1, 0, 'L');
			$pdf->CellFitScale(100,6,$p["description"],1, 0, 'L');
			$pdf->CellFitScale(20,6,"P" .number_format($p["price"],2,'.',','),1, 0, 'L');
			$pdf->CellFitScale(25,6,"P" .number_format($p["quantity"]*$p["price"],2,'.',','),1, 0, 'L');
			$totalAmount += ($p["quantity"]*$p["price"]);
		}
		$y = $y+12;
		$pdf->SetY($y);
		$pdf->SetX($xAxis);
		$pdf->CellFitScale(20,6,"",1, 0, 'C');
		$pdf->CellFitScale(15,6,"",1, 0, 'L');
		$pdf->CellFitScale(100,6,"",1, 0, 'L');
		$pdf->SetFont('Times','B',11);
		$pdf->CellFitScale(20,6,"TOTAL",1, 0, 'L');
		$pdf->SetFont('Times','',11);
		$pdf->CellFitScale(25,6,"P" .number_format($totalAmount,2,'.',','),1, 0, 'L');

		$y = $yAxisBeforeBox+60;
		$pdf->SetY($y);
		$pdf->SetX($xAxis);
		$pdf->CellFitScale(20,6,"",1, 0, 'C');
		$pdf->CellFitScale(15,6,"",1, 0, 'L');
		$pdf->CellFitScale(100,6,"Patient Name: ".$data['patient_name'],1, 0, 'L');
		$pdf->CellFitScale(20,6,"",1, 0, 'L');
		$pdf->CellFitScale(25,6,"",1, 0, 'L');

		$y = $y+7;
		$pdf->SetY($y);
		$pdf->SetX($xAxis);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(90,4,"Approved By:",0, 0, 'L');
		$pdf->Cell(60,4,"Received in good order and condition:",0, 0, 'L');

		$pdf->SetFont('Times','',9);

		$filename = "../pdf/receipt.pdf";
		$pdf->Output($filename,'F');

	}

?>